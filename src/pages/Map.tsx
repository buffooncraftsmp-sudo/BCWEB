import { ExternalLink, Map, Compass, Globe, Mountain, TreePine } from 'lucide-react';

const MAP_URL = 'http://104.204.222.49:25593/#world:-1201:0:200:4299:0.04:0:0:0:perspective';

export default function LiveMap() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-lg" />
          <p className="font-pixel text-xs text-brand-400 tracking-widest mb-4">LIVE MAP</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            Explore the <span className="text-brand-400">World</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Navigate the BuffoonCraft world in real time. See active players, explore builds,
            and find your way around the map.
          </p>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-brand-500/30 active:scale-[0.97]"
          >
            <Globe className="w-6 h-6" />
            Open Live Map
            <ExternalLink className="w-5 h-5 opacity-80" />
          </a>

          <p className="mt-4 text-xs text-slate-600">Opens in a new tab</p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            {
              icon: Compass,
              title: 'Real-Time View',
              body: 'The map updates live as players move, build, and explore.',
            },
            {
              icon: Mountain,
              title: 'Full World Coverage',
              body: 'All explored chunks rendered — from spawn to the furthest base.',
            },
            {
              icon: TreePine,
              title: '3D Perspective',
              body: 'Switch between surface, cave, and full 3D perspective views.',
            },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-slate-900/60 border border-white/8 rounded-2xl hover:border-brand-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* Big CTA card */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-slate-900 to-slate-900 p-10 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
          <Map className="w-12 h-12 text-brand-400 mx-auto mb-5" />
          <h2 className="text-2xl font-extrabold text-white mb-3">Ready to explore?</h2>
          <p className="text-slate-400 mb-7 max-w-sm mx-auto">
            The live map opens in its own tab so you can play and navigate at the same time.
          </p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/30"
          >
            <Globe className="w-5 h-5" />
            Launch Map
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
