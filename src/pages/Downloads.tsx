import { CSSProperties } from 'react';
import { Download, HardDrive, ExternalLink } from 'lucide-react';

interface Season {
  number: number;
  label: string;
  title: string;
  description: string;
  logo?: string;
  logoFill?: boolean;
  logoBgColor?: string;
  logoImgStyle?: CSSProperties;
  fileSize?: string;
  downloadUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Add / update season world downloads here.
// Set downloadUrl to the direct link for the world file.
// Leave downloadUrl undefined to display "Not available" instead.
// ─────────────────────────────────────────────────────────────────────────────
const SEASONS: Season[] = [
  {
    number: 1,
    label: 'S1 + S2',
    title: 'Seasons 1 & 2',
    description: 'Seasons 1 and 2 were played on the same continuous world — there was no reset between them. Season 1 was kingdom inspired, while Season 2 was the very first lore-driven season, introducing Maryn and the Chronicle.',
    fileSize: undefined,
    downloadUrl: 'https://drive.google.com/file/d/1gP7Qp_VXQQTGd-HwhnzvvGv93L8O2CIZ/view?usp=sharing',
  },
  {
    number: 3,
    label: 'S3',
    title: 'Season 3',
    description: 'Set in the Folley Mines, Season 3 saw the Buffoons trapped deep underground in a mysterious cave for a major part of the season.',
    fileSize: undefined,
    downloadUrl: 'https://drive.google.com/file/d/1H8D250HZ1_jEtCqGFoBXHokAxhDeBEiK/view?usp=sharing',
  },
  {
    number: 4,
    label: 'S4',
    title: 'Season 4',
    logo: '/Season_4_Logo_Png_noCutSmol.png',
    description: 'The Buffoons went back to basics — no story, just incredible builds. One of the longest seasons, defined entirely by the quality of what was created.',
    fileSize: undefined,
    downloadUrl: 'https://drive.google.com/file/d/1ZI19kHlwjGmzmOLrH4R537NMF9kVyn0w/view?usp=sharing',
  },
  {
    number: 5,
    label: 'S5',
    title: 'Season 5',
    logo: '/BCv_logo.png',
    logoFill: true,
    description: 'Set around the Guilded Throne within the Guilded Castle, Season 5 saw the moon mysteriously come to life — and the Buffoons had to defeat it.',
    fileSize: undefined,
    downloadUrl: 'https://drive.google.com/file/d/1OO4_75eaeg7i0n87awcMUHlxPTwOma_3/view?usp=sharing',
  },
  {
    number: 6,
    label: 'S6',
    title: 'Buffoonskies',
    logo: '/BC_Obsidian_Season_Icon_Notext_-_Copy.png',
    description: 'Set in the skies, the Buffoons met Maryn again after a long time to unravel mysteries of the past.',
    fileSize: undefined,
    downloadUrl: 'https://drive.google.com/file/d/1TulIGQLUWljdqh2MlY8LiXvfAKljB-pc/view?usp=sharing',
  },
];

function SeasonCard({ s }: { s: Season }) {
  const available = !!s.downloadUrl;

  return (
    <div className={`group relative flex flex-col sm:flex-row items-start gap-6 p-6 lg:p-8 bg-slate-900/50 border rounded-2xl transition-all duration-300 ${
      available
        ? 'border-white/8 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10'
        : 'border-white/5 opacity-70'
    }`}>
      {/* Season badge */}
      <div
        className={`flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden transition-colors ${
          available
            ? 'border border-brand-500/25 group-hover:border-brand-500/50'
            : 'border border-white/8'
        }`}
        style={s.logoBgColor ? { backgroundColor: s.logoBgColor } : undefined}
      >
        <img
          src={s.logo ?? '/BC_Obsidian_Season_Icon_Notext_-_Copy.png'}
          alt=""
          className={`w-full h-full ${s.logoFill ? 'object-fill' : 'object-contain p-1'} transition-opacity ${available ? 'opacity-90 group-hover:opacity-100' : 'opacity-25 grayscale'}`}
          style={s.logoImgStyle}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h3 className="text-lg font-bold text-white leading-tight">{s.title}</h3>
          {!available && (
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
        {s.fileSize && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <HardDrive className="w-3.5 h-3.5" />
            {s.fileSize}
          </div>
        )}
      </div>

      {/* Download button */}
      <div className="flex-shrink-0 self-center sm:self-auto">
        {available ? (
          <a
            href={s.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500/20 hover:bg-brand-500/35 border border-brand-500/40 hover:border-brand-500/70 text-brand-300 font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/15"
          >
            <Download className="w-4 h-4" />
            Download
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-white/8 text-slate-600 font-semibold text-sm rounded-xl cursor-not-allowed">
            <Lock className="w-4 h-4" />
            Not available
          </div>
        )}
      </div>
    </div>
  );
}

export default function Downloads() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-lg" />
          <p className="font-pixel text-xs text-brand-400 tracking-widest mb-4">EXPLORE THE WORLDS</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            World <span className="text-brand-400">Downloads</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Download past Buffooncraft worlds and explore every build, farm, and landmark
            that shaped each season's story — at your own pace.
          </p>
        </div>
      </div>

      {/* Season list */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {SEASONS.map((s) => (
          <SeasonCard key={s.number} s={s} />
        ))}
      </div>

      {/* Notice banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-28">
        <div className="flex items-start gap-3 p-4 bg-amber-500/8 border border-amber-500/20 rounded-xl">
          <HardDrive className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300/80 leading-relaxed">
            These are the original, unmodified world files directly from the BuffoonCraft server and are completely virus free. Provided for personal, non-commercial use only — please do not redistribute or re-upload without permission.
          </p>
        </div>
      </div>
    </div>
  );
}
