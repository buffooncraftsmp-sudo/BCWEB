import { useState, useEffect } from 'react';
import {
  Users, Heart, ChevronDown, Play, ExternalLink, Sparkles
} from 'lucide-react';
import { fetchTwitchStats, TwitchStats } from '../lib/twitch';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const ABOUT_PARAGRAPHS = [
  'Buffooncraft is a content creator–driven Minecraft SMP built around a close-knit group of friends who share a passion for creativity, chaos, and making unforgettable content together. What started as a group of players hanging out has grown into a world full of inside jokes, shared history, and moments that only this group could create.',
  'At its core, Buffooncraft is more than just survival—it\'s about capturing genuine interactions and turning them into stories. Whether it\'s ambitious builds, spontaneous chaos, friendly rivalries, or late-night sessions that turn into something unexpected, every moment is shaped by the people behind it. The strong bonds between players bring a natural energy to the server that you can\'t fake.',
  'Driven by personality and collaboration, Buffooncraft is a space where creators push each other, build together, and create content that feels real. The world evolves not just through builds and events, but through friendships, shared experiences, and the kind of chemistry that makes every episode worth watching.',
  'This isn\'t just a server—it\'s a group of friends creating something unforgettable.',
];

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [twitchStats, setTwitchStats] = useState<TwitchStats | null>(null);

  useEffect(() => {
    fetchTwitchStats().then(setTwitchStats);
    const t = setInterval(() => fetchTwitchStats().then(setTwitchStats), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1117259/pexels-photo-1117259.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover opacity-[0.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-crimson-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <img
            src="/BC_logo_blank_(Phone).png"
            alt="BuffoonCraft"
            className="w-36 h-36 sm:w-48 sm:h-48 object-contain drop-shadow-2xl mx-auto mb-8"
          />

          {/* Wordmark — no subtitle */}
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-10 leading-relaxed">
            BUFFOON<span className="text-brand-400">CRAFT</span>
          </h1>

          {/* Pill stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 bg-slate-900/70 border border-white/8 rounded-full px-5 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {twitchStats ? (
                <span className="text-sm font-semibold text-slate-200 tabular-nums">
                  {twitchStats.totalViewers.toLocaleString()} watching &middot; {twitchStats.liveCount} live
                </span>
              ) : (
                <span className="text-sm font-semibold text-slate-200">Watch live on Twitch</span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-slate-900/70 border border-white/8 rounded-full px-5 py-2.5 backdrop-blur-sm">
              <Heart className="w-4 h-4 text-crimson-400" />
              <span className="text-sm font-semibold text-slate-200">
                {twitchStats && twitchStats.totalFollowers > 0
                  ? `${twitchStats.totalFollowers.toLocaleString()} followers`
                  : '6.5k+ community'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/70 border border-white/8 rounded-full px-5 py-2.5 backdrop-blur-sm">
              <span className="text-sm font-semibold text-slate-200">Est. 2021</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/68jDStu38S"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#5865F2]/30"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.264.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.264a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.835 19.835 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
            <button
              onClick={() => onNavigate('apply')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson-600 hover:bg-crimson-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-crimson-500/30"
            >
              <Play className="w-5 h-5" />
              Become a Buffoon
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <p className="font-pixel text-xs text-brand-400 tracking-widest">WHAT IS BUFFOONCRAFT</p>
          </div>

          <div className="space-y-8">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === ABOUT_PARAGRAPHS.length - 1
                    ? 'text-xl font-bold text-white border-l-4 border-brand-500 pl-6 py-1'
                    : 'text-lg text-slate-300'
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Users,    label: 'Close-knit Creator Group', body: 'A handpicked crew of personalities who genuinely vibe together.' },
              { icon: Heart,    label: 'Real Friendships',         body: 'Built on trust, inside jokes, and shared memories spanning years.'  },
              { icon: Sparkles, label: 'Unforgettable Content',    body: 'Every session becomes a story. That\'s the BuffoonCraft difference.'  },
            ].map((card, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-white/8 rounded-2xl hover:border-brand-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{card.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────────────────────── */}
      <section id="community" className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-crimson-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-pixel text-xs text-brand-400 tracking-widest mb-4">THE COMMUNITY</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            More Than<br />Just a Server
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            BuffoonCraft is a home. The creators form real friendships, collaborate on massive
            projects, and show up every season because they genuinely enjoy being here.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/68jDStu38S"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#5865F2]/30"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.264.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.264a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.835 19.835 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
            <button
              onClick={() => onNavigate('buffoons')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
            >
              Meet the Buffoons
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Want to be Part of It?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Jump into the Discord to follow along, or apply to join the crew as a creator.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/68jDStu38S"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.264.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.264a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.835 19.835 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
            <button
              onClick={() => onNavigate('apply')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson-600 hover:bg-crimson-500 text-white font-bold rounded-xl transition-all"
            >
              Apply as Creator
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
