import { useState, useEffect } from 'react';
import React from 'react';
import { Crown } from 'lucide-react';
import Home      from './pages/Home';
import Buffoons  from './pages/Buffoons';
import History   from './pages/History';
import Apply     from './pages/Apply';
import LiveMap   from './pages/Map';
import Downloads from './pages/Downloads';
import Lore from './pages/Lore';
type Page = 'home' | 'buffoons' | 'history' | 'lore' | 'apply' | 'map' | 'downloads' | 'store';

const NAV: { id: Page; label: string }[] = [
  { id: 'buffoons',  label: 'Buffoons'  },
  { id: 'history',   label: 'History'   },
  { id: 'lore',      label: 'Lore'      },
  { id: 'map',       label: 'Live Map'  },
  { id: 'downloads', label: 'Downloads' },
  { id: 'apply',     label: 'Apply'     },
];

const PAGE_TITLES: Record<Page, string> = {
  home:      'BuffoonCraft',
  buffoons:  'Buffoons — BuffoonCraft',
  history:   'History — BuffoonCraft',
  lore:      'Lore — BuffoonCraft',
  map:       'Live Map — BuffoonCraft',
  downloads: 'Downloads — BuffoonCraft',
  apply:     'Apply — BuffoonCraft',
  store:     'Store — BuffoonCraft',
};

export default function App() {
  const [page, setPage]         = useState<Page>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLES[page];
  }, [page]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (to: Page) => {
    setPage(to);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased">

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || page !== 'home'
            ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">

          {/* Logo — always goes to Home */}
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/BC_logo_blank_(Phone).png"
              alt="BuffoonCraft"
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="hidden sm:block font-pixel text-[11px] text-white leading-tight tracking-tight">
              BuffoonCraft
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home link */}
            <button
              onClick={() => navigate('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                page === 'home'
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            {NAV.map(({ id, label }) => (
              <React.Fragment key={id}>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button
                  onClick={() => navigate(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    page === id
                      ? 'bg-brand-500/20 text-brand-300'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              </React.Fragment>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://discord.gg/68jDStu38S"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-sm rounded-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.264.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.264a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.835 19.835 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
            <button
              onClick={() => navigate('store')}
              className="flex items-center gap-2 px-4 py-2 bg-crimson-600 hover:bg-crimson-500 text-white font-semibold text-sm rounded-lg transition-all"
            >
              <Crown className="w-4 h-4" />
              Store
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/5 px-4 py-4 space-y-1">
            <button
              onClick={() => navigate('home')}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                page === 'home' ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  page === id ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-3">
              <a
                href="https://discord.gg/68jDStu38S"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#5865F2] text-white font-bold rounded-xl text-sm"
              >
                Discord
              </a>
              <button
                onClick={() => navigate('store')}
                className="flex items-center justify-center gap-2 py-3 bg-crimson-600 text-white font-bold rounded-xl text-sm"
              >
                Store
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main>
        {page === 'home'      && <Home     onNavigate={navigate} />}
        {page === 'buffoons'  && <Buffoons />}
        {page === 'history'   && <History  />}
        {page === 'lore'      && <Lore     />}
        {page === 'map'       && <LiveMap  />}
        {page === 'downloads' && <Downloads />}
        {page === 'apply'     && <Apply    />}
        {page === 'store'     && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-6">
            <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="h-24 w-24 object-contain opacity-90" />
            <div>
              <p className="font-pixel text-xs text-brand-400 tracking-widest mb-3">BUFFOONCRAFT</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Store</h1>
              <p className="text-slate-400 text-lg">Coming soon.</p>
            </div>
            <button
              onClick={() => navigate('home')}
              className="mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold rounded-xl transition-all text-sm"
            >
              Back to Home
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {/* Brand */}
            <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
              <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="h-9 w-9 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-pixel text-[11px] text-white leading-tight">BuffoonCraft</span>
            </button>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {(['home', 'buffoons', 'history', 'lore', 'map', 'downloads', 'apply'] as Page[]).map(p => (
                <button
                  key={p}
                  onClick={() => navigate(p)}
                  className="text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium capitalize"
                >
                  {p === 'map' ? 'Live Map' : p}
                </button>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://discord.gg/68jDStu38S"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#5865F2] flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/8"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.264.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.264a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.835 19.835 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>Not affiliated with Mojang AB. Minecraft is a trademark of Mojang AB.</p>
            <p>BuffoonCraft · Season 6 · Est. 2021</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
