import { Star } from 'lucide-react';

interface Era {
  title: string;
  icon: React.ElementType;
  color: string;
  paragraphs: string[];
  badge?: string;
}

const ERAS: Era[] = [
  {
    title: 'The Beginning',
    icon: Star,
    color: 'brand',
    paragraphs: [
      'During the global pandemic, Nova and Chris spent much of their time playing together on a Minecraft server known as Bentcraft. As both were streamers, they naturally built communities around their content and shared experiences. Inspired by this, they decided to create something of their own—Buffooncraft.',
      'Buffooncraft initially launched as a Twitch subscriber server, designed exclusively for supporters of both Chris\'s and Nova\'s channels. It quickly became a lively, community-driven space where viewers could play alongside their favourite creators and be part of the action.',
      'This early version of Buffooncraft thrived for around six months. Over time, however, Nova and Chris began to see a larger vision for what the server could become. Wanting to elevate the quality of content and storytelling, they made the decision to transition Buffooncraft into a dedicated content creator server—marking the end of its first era and the beginning of something much bigger.',
    ],
  },
  {
    title: 'Season 1',
    icon: Star,
    color: 'crimson',
    paragraphs: [
      'Season 1 of Buffooncraft began with a small but dedicated group of eight players, known as the Buffoons. Unlike later seasons, there was no overarching storyline—this era focused purely on gameplay, creativity, and collaboration.',
      'The season took inspiration from a kingdom-style system. Each Buffoon established their own base, strategically built around specific resources. These bases effectively became small, independent hubs of production, with players specialising in different materials or items. At spawn, a central marketplace emerged where Buffoons would sell and trade their goods, creating a player-driven economy.',
      'This concept proved to be a major success. The mix of cooperation and competition gave the server a strong sense of identity, and the community quickly became engaged with the evolving world. As a result, Buffooncraft began to grow, attracting more attention and laying the foundation for future seasons.',
    ],
  },
  {
    title: 'Season 2',
    icon: Star,
    color: 'brand',
    paragraphs: [
      'Season 2 marked a turning point for Buffooncraft, as it introduced the server\'s first true step into structured storytelling. With Chris and Nova bringing in a dedicated writer, Buffooncraft evolved beyond simple gameplay and into a world driven by narrative and character development.',
      'For the first time, full storylines were woven into the server, giving players purpose, direction, and deeper connections to the world around them. This shift was a major success, capturing the attention of both players and viewers and setting Buffooncraft apart from its earlier form.',
      'This season also introduced two incredibly important figures to the lore: Chronicle and Maryn. Both characters would go on to become central pillars of Buffooncraft\'s overarching story, shaping events not just in Season 2, but in many seasons to come.',
      'Season 2 laid the groundwork for everything Buffooncraft would become—transforming it from a creative multiplayer server into a living, evolving narrative universe.',
    ],
  },
  {
    title: 'Season 3',
    icon: Star,
    color: 'crimson',
    paragraphs: [
      'After the success of Season 2, Chris and Nova fully committed to story-driven content as Buffooncraft\'s future. Nova took the lead on writing, bringing the narrative in-house for the first time.',
      'Season 3 introduced a darker tone, with more complex ideas and themes woven into the world. New storytelling methods were also explored, experimenting with how the story was delivered to players and viewers.',
      'This season solidified Buffooncraft\'s direction, proving that evolving lore and creative storytelling were here to stay.',
    ],
  },
  {
    title: 'Season 4',
    icon: Star,
    color: 'brand',
    paragraphs: [
      'After the intense focus on storytelling in previous seasons, the Buffoons chose to step back from lore in Season 4 and return to a more relaxed, gameplay-driven experience.',
      'This season ran for much longer than usual, giving players the time and freedom to fully develop their ideas. As a result, the scale and quality of bases and builds reached a whole new level, showcasing the creativity and dedication of the server.',
      'Season 4 proved that even without a central storyline, Buffooncraft could thrive—highlighting the strength of its players and the world they created together.',
    ],
  },
  {
    title: 'Season 5',
    icon: Star,
    color: 'crimson',
    paragraphs: [
      'Lore returned in a big way for Season 5.',
      'The season began with a large-scale story centered around the Gilded Throne, which quickly became a key focus of the narrative. One of the most memorable elements was the moon itself, brought to life through a custom texture pack, adding a unique and immersive visual twist to the world.',
      'The season built toward an ambitious finale, where the Buffoons travelled to the moon and ultimately destroyed it. In the aftermath, the fate of the Gilded Throne became a mystery—its whereabouts still unknown.',
      'Whether it will return remains an open question.',
    ],
  },
  {
    title: 'Season 6',
    badge: 'A New Era',
    icon: Star,
    color: 'brand',
    paragraphs: [
      'Season 6 marked the beginning of a new era for Buffooncraft. Following Chris\'s departure, Nova brought Flying on board to help lead the server forward. Flying stepped into the role of lead writer, while Nova focused on the technical side of the server.',
      'This season is still ongoing and has evolved into one of the most collaborative yet. Not only are Flying and Nova shaping the story, but the Buffoons themselves are now actively creating events and contributing ideas, making the world feel more alive than ever.',
      'With over 18 months of activity and still going strong, Season 6 has become a standout chapter in Buffooncraft\'s history—driven by creativity, teamwork, and a shared vision for the future.',
    ],
  },
];

export default function History() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-crimson-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-lg" />
          <p className="font-pixel text-xs text-crimson-400 tracking-widest mb-4">OUR STORY</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            The History of<br /><span className="text-brand-400">BuffoonCraft</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            From a small server among friends to a thriving world shaped by creators, stories, and chaos—this is the evolution of Buffooncraft.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-crimson-500/30 to-transparent -translate-x-1/2" />

          <div className="space-y-16">
            {ERAS.map((era) => {
              const dotRing = era.color === 'brand' ? 'ring-brand-500/50'  : 'ring-crimson-500/50';
              const dotBg   = era.color === 'brand' ? 'bg-brand-500'       : 'bg-crimson-500';

              return (
                <div key={era.title} className="relative">
                  {/* Dot */}
                  <div className={`absolute left-8 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-xl ${dotBg} ring-4 ${dotRing} shadow-lg`}>
                    <era.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Card */}
                  <div className="ml-20">
                    <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-7 hover:border-brand-500/20 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="font-bold text-xl text-white">{era.title}</h2>
                        {era.badge && (
                          <span className="font-bold text-xs px-2.5 py-1 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30 tracking-wide">
                            {era.badge}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        {era.paragraphs.map((p, j) => (
                          <p key={j} className="text-slate-400 leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-20 text-center">
          <div className="inline-block px-8 py-6 bg-slate-900/60 border border-white/8 rounded-2xl">
            <img src="/BC_logo_blank_(Phone).png" alt="" className="w-14 h-14 object-contain mx-auto mb-4 opacity-80" />
            <p className="text-slate-300 font-medium max-w-sm">
              The story isn't finished. Every player who joins writes the next chapter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
