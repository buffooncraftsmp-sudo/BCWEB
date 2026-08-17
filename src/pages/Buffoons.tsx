import { useEffect, useState } from 'react';
import { Twitch } from 'lucide-react';
import { fetchTwitchStats, TwitchStats, TwitchUserStatus } from '../lib/twitch';

// ─────────────────────────────────────────────────────────────────────────────
// Add / update buffoon profiles here. Skins are rendered from the IGN via
// mc-heads.net — no manual image needed unless you want to override with
// a custom `avatarUrl`.
// ─────────────────────────────────────────────────────────────────────────────
interface Buffoon {
  ign: string;          // Minecraft IGN — used for skin render
  displayName: string;  // Name shown on the card
  role: string;
  bio: string;
  twitchLogin: string;
  avatarUrl?: string;   // Optional override; falls back to mc-heads skin
}

const BUFFOONS: Buffoon[] = [
  {
    ign: 'Supernova_relic',
    displayName: 'Nova',
    role: 'Founder & Technical Lead',
    twitchLogin: 'supernova_relic',
    bio: 'Nova is the founder of Buffooncraft and the driving force behind its creation and continued evolution. From the very beginning, Nova has led the server\'s technical direction, ensuring smooth performance, developing systems, and constantly pushing for new and unique ideas that set Buffooncraft apart.\n\nIn-game, Nova is known for building large-scale, highly themed areas that bring creativity and ambition together. With a strong passion for technical redstone, he enjoys designing complex systems and tackling the challenge of integrating farms seamlessly into builds—often disguising them so well that their functionality is almost invisible.\n\nAlways striving to innovate, Nova plays a key role in shaping both the technical backbone and creative identity of Buffooncraft.',
  },
  {
    ign: 'FlyingVillager',
    displayName: 'Flying Villager',
    role: 'Creative Lead',
    twitchLogin: 'flyingvillager',
    bio: 'Flying Villager is a key creative force in Buffooncraft and one of the driving voices behind the server\'s evolving story. Taking an active role in writing and helping lead narrative events, he has helped shape the flow of each season and brought a stronger sense of direction and depth to the world.\n\nIn-game, Flying Villager is known for his exceptional building skill, creating stunning structures filled with rich detail and atmosphere. His builds always feel alive and lived in, with a level of craftsmanship that brings every space to life. He is also highly skilled in farms and redstone, combining efficiency with design in a way that complements his builds rather than detracts from them.\n\nWith a strong creative vision and technical ability, Flying Villager plays a major role in both the storytelling and visual identity of Buffooncraft.',
  },
  {
    ign: 'Thunderhand64',
    displayName: 'ThunderHand',
    role: 'Season 2 Veteran',
    twitchLogin: 'thunderhand64_gaming',
    bio: 'ThunderHand is one of Buffooncraft\'s longest-standing members, having joined in Season 2 and quickly becoming a familiar and much-loved presence in the community. His steady personality and warm reputation have made him an important part of what makes Buffooncraft feel like home.\n\nIn-game, ThunderHand is known for his geometrically precise builds, drawing on his background as a former maths teacher to create carefully structured, visually cohesive work. He has a strong eye for block palettes, choosing combinations that make builds feel striking and intentional. He also has a love of zany, creative farm designs that push ideas in unconventional directions — and perhaps most notably, he revolutionised villager trading halls on Buffooncraft, leaving a lasting impact on the server\'s technical gameplay.\n\nA consistent and creative presence since Season 2, ThunderHand — and his trademark "och" whenever things go wrong — remains an irreplaceable part of Buffooncraft\'s identity.',
  },
  {
    ign: 'LuxJGaming',
    displayName: 'Lux',
    role: 'Resident Chaos Agent',
    twitchLogin: 'luxjgaming',
    bio: 'Lux joined Buffooncraft in Season 6 as the youngest member on the server, and wasted absolutely no time making his presence felt. Despite being a newer face, his impact on the social energy and atmosphere of the community has been anything but small.\n\nIn-game, Lux is a cosy and creative builder, crafting warm, inviting spaces that feel lived in and full of personality. His builds carry a strong sense of charm and character that stands out across the server. Away from his builds, however, things tend to get considerably more chaotic — Lux is well known for setting up spontaneous mini-games, pulling tricks on fellow players, and generally engineering organised chaos wherever he goes. Being around Lux means plans rarely survive first contact, and that unpredictability is a huge part of what makes him so entertaining to be around.\n\nHe also carries a long-running reputation for getting blamed for everything on the server, whether he was actually responsible or not. With a mix of creativity, mischief, and relentless energy, Lux adds a constant spark of unpredictability to Buffooncraft.',
  },
  {
    ign: 'kylady35',
    displayName: 'Kylady',
    role: 'Queen of Buffooncraft',
    twitchLogin: 'ky_creates',
    bio: 'Kylady is widely regarded as the queen of Buffooncraft, bringing a confident yet playful presence to the server that is hard to miss. Her easygoing attitude and refusal to take herself too seriously make her a constant source of fun and positivity within the community.\n\nIn-game, Kylady is known for her love of ambitious, fully committed themes — from Las Vegas-inspired cities to Viking settlements and Disney-esque princess castles. Each project reflects a strong sense of imagination and the willingness to see a bold concept through from start to finish. Her creativity extends well beyond Minecraft too; she paints and crafts handmade gifts, and that artistic eye carries into everything she builds and creates on the server.\n\nWith stunning themed builds and a relaxed, infectious energy, Kylady adds colour and character to Buffooncraft wherever she goes.',
  },
  {
    ign: 'ShutMountain409',
    displayName: 'Shut',
    role: 'The Big Builder',
    twitchLogin: 'shutmountain409fb',
    bio: 'Shut has been a member of Buffooncraft since Season 2, and in that time has built a reputation for always thinking big — with a heart to match. His ambition and presence are felt across every project he takes on, consistently pushing the scale of what gets built on the server.\n\nBeyond his own builds, Shut is reliably one of the first to offer a hand on group projects, making him a genuinely supportive and valued part of the community. His laid-back personality makes him easy to work with, and his steady presence is something the other Buffoons can count on.\n\nHis builds speak for themselves in their scale and boldness — including a giant monument-style base inspired by the events of 9/11, a project that underlines just how committed he is to going big. Despite the ambition of his work, Shut always brings a calm and approachable energy to everything he does.\n\nWith his generosity, relaxed nature, and large-scale building style, Shut remains an important and valued member of Buffooncraft.',
  },
  {
    ign: 'princess_nebula',
    displayName: 'Nebs',
    role: 'The Grind Never Stops',
    twitchLogin: 'princessnebula',
    bio: 'Nebs is a sweet, down-to-earth member of Buffooncraft from the southern United States. She brings a warm and positive energy to the server, with a style that shines through in everything she builds and does.\n\nNebs loves building in a fantasy style, often creating colourful, vibrant builds that are a joy to explore. Her work is consistently full of charm and creativity, making her builds feel welcoming and alive.\n\nShe is also known as one of the biggest grinders in Minecraft, putting in huge amounts of time gathering resources and pushing through long sessions of work. Alongside this dedication, she enjoys collecting rare items and completing achievements, always aiming to fill out every corner of the game.\n\nHer personality reflects a kind of "southern hospitality" — welcoming, generous, and always making others feel at home on the server.\n\nAbove all, Nebs is simply a kind and sweet presence on Buffooncraft, someone who brings calm energy and positivity wherever she goes.',
  },
  {
    ign: 'CallMeEveGaming',
    displayName: 'Eve',
    role: 'The Dutch Dynamo',
    twitchLogin: 'callmeevegaming',
    bio: 'Eve is a member of Buffooncraft hailing from the Netherlands, bringing a straightforward, no-nonsense personality that the Buffoons have come to appreciate. She doesn\'t beat around the bush, and her direct way of speaking often adds clarity and humour to group conversations.\n\nEve enjoys building and spending time around other players, often taking part in group projects and social spaces across the server. She is very chatty and brings a constant flow of conversation, helping keep the community lively and connected.\n\nHer sense of humour and honesty make her a fun and reliable presence on Buffooncraft, someone who fits naturally into both chaotic moments and collaborative builds.\n\nWith her openness, creativity, and energy, Eve is a well-loved part of the Buffooncraft community.',
  },
  {
    ign: 'FoolishSage',
    displayName: 'Sage',
    role: 'The Mountain Mover',
    twitchLogin: 'realfoolishsage',
    bio: 'Sage joined Buffooncraft in Season 6 and has quickly proven himself to be a true Buffoon. He is someone who has spent months on ambitious projects, including removing a mountain and uncovering an ancient city beneath it, showing both persistence and creativity in equal measure.\n\nSage is highly intelligent and brings a sharp, thoughtful approach to everything he does. At the same time, he has a strong sense of humour and is often a source of random music and unexpected moments that add life to the server.\n\nHaving followed the Buffoons for a long time as a supporter before fully joining in, he has a deep understanding of the community and what it means to be part of it. He fits naturally into the group dynamic and embodies the spirit of Buffooncraft in his own way.\n\nWith his mix of intelligence, humour, and dedication, Sage has become a valued and authentic part of the Buffooncraft community.',
  },
  {
    ign: 'OPG8',
    displayName: 'OPG',
    role: 'The Realm Crafter',
    twitchLogin: '1playergamer',
    bio: 'OPG joined Buffooncraft in Season 6 and has made a strong impression through his creativity and large-scale vision. He has built an expansive fantasy-inspired area filled with giant mushrooms, plants, butterflies, and other magical creatures. The scale of his builds is truly impressive, creating environments that feel alive and immersive.\n\nOPG has a more chilled presence on the server, bringing a calm and relaxed energy while still being very enjoyable to be around. He is also well known for his love of gaming and for consistently streaming Buffooncraft, sharing the world and its moments with others.\n\nWith his creativity, laid-back attitude, and presence in the community, OPG adds both visual wonder and steady energy to Buffooncraft.',
  },
  {
    ign: 'Lonestarr_82',
    displayName: 'Lone',
    role: 'The Northern Enforcer',
    twitchLogin: 'lonestarr_82',
    bio: 'Lone joined Buffooncraft in Season 5 and immediately showed his dedication by creating not one, but two large bases within the same season. From the start, he proved himself to be a committed and ambitious builder.\n\nLone has a very dry sense of humour, which often catches people off guard and adds to his understated personality. He is also known as an enforcer on the server, often seen geared up in full netherite with shield and sword, jokingly "keeping order" while interacting with other Buffoons.\n\nHe is very fun to be around and brings a strong social presence to the group, balancing his playful in-game antics with a relaxed and approachable attitude. From the north of England, he currently has a major project underway: a huge prison build that reflects his love for large-scale, structured designs.\n\nWith his mix of ambition, humour, and presence, Lone is a memorable and valued part of Buffooncraft.',
  },
  {
    ign: 'korny46',
    displayName: 'Korny',
    role: 'The Viking Corsair',
    twitchLogin: 'k46sleepwalker',
    bio: 'Korny joined Buffooncraft in Season 2 and is widely regarded as one of the most good-hearted members of the server, always willing to help anyone and do whatever he can for others.\n\nHis builds are consistently impressive, often blending creativity with strong thematic vision. With a deep love of music, he famously created a full stage inspired by a Korn concert back in Season 2, showcasing both ambition and personality in his work.\n\nKorny also has a strong passion for Viking and pirate themes, which frequently influence his builds. His current project is a Sea of Thieves-inspired island, featuring bold details including a massive green glass skull that stands as a striking centrepiece.\n\nWith his generosity, creativity, and thematic building style, Korny remains a core and much-loved part of Buffooncraft.',
  },
  {
    ign: 'Doranoob',
    displayName: 'Dora',
    role: 'The Grand Excavator',
    twitchLogin: 'dorasplorer',
    bio: 'Dora joined Buffooncraft in Season 6 and quickly impressed the Buffoons with her large-scale building plans and ambition. She has a strong creative vision and is already leaving a clear mark on the server.\n\nOne of her major projects is a stunning Mediterranean-style town built around a lake and underground area, combining atmosphere, scale, and careful detail. Alongside this, she has been digging a massive excavation site for a "Mines of Moria"-style build, affectionately nicknamed the "Dines of Dora" by the Buffoons.\n\nDora is kind, gentle, and a good laugh, bringing a calm and friendly presence to the community. She also often finds herself looking after Lux during chaotic moments — most notably during Buffoonskies — earning her plenty of patience points in the process.\n\nWith her creativity, humour, and large-scale vision, Dora is becoming a standout part of Buffooncraft.',
  },
  {
    ign: 'TheSkipJack81',
    displayName: 'Skip',
    role: 'The Bedrock Convert',
    twitchLogin: 'skipjack81',
    bio: 'Skip joined Buffooncraft in Season 6, coming from Bedrock Edition, and has quickly orientated himself with Java mechanics. Despite the transition, he has adapted fast and is already getting fully immersed in the deeper systems of the game.\n\nWith a strong love of farms, Skip has been diving into Java mechanics and clearly enjoys the challenge of learning and optimising them. His curiosity and willingness to experiment have made him a steadily growing technical presence on the server.\n\nSkip is a lovely, caring person and brings a calm, friendly energy to the community, making him easy to get along with and a welcome part of the Buffoons.',
  },
  {
    ign: 'AngelByU',
    displayName: 'Angel',
    role: 'The Rollercoaster Architect',
    twitchLogin: 'angelbyu',
    bio: 'Angel joined Buffooncraft in Season 4 and quickly made her mark with a rollercoaster build that showcased her creativity and sense of fun. After taking a break from the server, she returned in Season 6 during Buffoonskies, reconnecting with the community.\n\nAngel is great fun to be around, bringing a kind and easygoing presence whenever she is online. Although she is not as active as many of the other Buffoons, her appearances are always appreciated, and the community enjoys having her around whenever she can join in.\n\nWith her creativity, warmth, and return to the server at key moments, Angel remains a valued part of Buffooncraft.',
  },
];

function skinUrl(ign: string) {
  return `https://visage.surgeplay.com/full/256/${ign}`;
}

function BuffoonCard({ b, live }: { b: Buffoon; live?: TwitchUserStatus }) {
  const imgSrc = b.avatarUrl ?? skinUrl(b.ign);

  return (
    <article className="group grid lg:grid-cols-[280px_1fr] gap-0 bg-slate-900/50 border border-white/8 rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10">

      {/* Skin panel */}
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-800/60 to-slate-950/80 min-h-[320px] lg:min-h-0 overflow-hidden`}>
        {/* Ambient glow behind skin */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-crimson-500/8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

        <img
          src={imgSrc}
          alt={b.ign}
          className="relative z-10 h-72 lg:h-full max-h-[380px] w-auto object-contain object-center drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            // fall back to head if full body fails
            (e.currentTarget as HTMLImageElement).src = `https://mc-heads.net/body/${b.ign}/250`;
          }}
        />

        {/* Role badge anchored bottom-left */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-block px-3 py-1.5 bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-bold rounded-full backdrop-blur-sm tracking-wide uppercase">
            {b.role}
          </span>
        </div>
      </div>

      {/* Bio panel */}
      <div className={`flex flex-col justify-center p-8 lg:p-12`}>
        {/* Name */}
        <div className="mb-6">
          <h2 className="font-pixel text-2xl sm:text-3xl text-white mb-1 leading-snug">
            {b.displayName}
          </h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide">
            {b.ign}
          </p>
        </div>

        {/* Bio — split on \n\n into paragraphs */}
        <div className="space-y-4 mb-8">
          {b.bio.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-400 leading-relaxed text-[0.95rem]">
              {para}
            </p>
          ))}
        </div>

        {/* Twitch CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://www.twitch.tv/${b.twitchLogin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#5c3a8e]/30 hover:bg-[#7c3aed]/40 border border-[#7c3aed]/40 hover:border-[#7c3aed]/70 text-[#c4b5fd] font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Twitch className="w-4 h-4" />
            Watch on Twitch
          </a>
          {live?.isLive && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold rounded-full uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Live &middot; {live.viewerCount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Buffoons() {
  const [twitchStats, setTwitchStats] = useState<TwitchStats | null>(null);

  useEffect(() => {
    fetchTwitchStats().then(setTwitchStats);
    const t = setInterval(() => fetchTwitchStats().then(setTwitchStats), 60_000);
    return () => clearInterval(t);
  }, []);

  const liveByLogin = new Map(
    (twitchStats?.users ?? []).map(u => [u.login.toLowerCase(), u])
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-lg" />
          <p className="font-pixel text-xs text-brand-400 tracking-widest mb-4">MEET THE CREW</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            The <span className="text-brand-400">Buffoons</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            These are the players at the heart of BuffoonCraft — builders, streamers, and community legends.
            Each one brings something unique to our world.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 space-y-8">
        {BUFFOONS.map((b) => (
          <BuffoonCard key={b.ign} b={b} live={liveByLogin.get(b.twitchLogin.toLowerCase())} />
        ))}
      </div>
    </div>
  );
}
