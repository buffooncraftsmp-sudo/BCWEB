import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Scroll } from 'lucide-react';

interface LoreEntry {
  id: string;
  title: string;
  location: string;
  era?: string;
  paragraphs: string[];
  status: 'complete' | 'ongoing' | 'unknown';
}

const LORE: LoreEntry[] = [
  {
    id: 'chronicle',
    title: 'Chronicle',
    location: 'Chronicle',
    era: 'Season 2',
    status: 'complete',
    paragraphs: [
      'The Buffoons arrived in the once-thriving town of Chronicle, a settlement built above an ancient and forgotten mine. Blinded by greed, the townsfolk dug deeper than they ever should have, eventually uncovering a mysterious portal buried beneath the earth. When they opened it, they unknowingly unleashed the Overseers upon the world.',
      'By the time the Buffoons reached Chronicle, the town had fallen into ruin. Almost every resident had been lost, leaving behind abandoned streets, forgotten buildings, and the lingering corruption of the Overseers.',
      'It was here that the Buffoons met Maryn, a mysterious spirit bound to the world itself. Acting as their guide, she led them through Chronicle\'s many trials, ancient dungeons, and hidden secrets as they searched for a way to stop the growing darkness.',
      'Their journey culminated in the defeat of the Ender Dragon, an act that restored Maryn to her human form and brought hope back to a world on the brink of collapse.',
      'But victory came at a cost.',
      'While the Buffoons had defeated the dragon, they failed to destroy the Overseers\' Ship, leaving the ancient enemy free to continue its plans in the shadows.',
      'It was a mistake that would shape the future of Buffooncraft for many years to come.',
    ],
  },
  {
    id: 'folley-mines',
    title: 'The Folley Mines',
    location: 'The Folley Mines',
    era: 'Season 3',
    status: 'complete',
    paragraphs: [
      'Realising the consequences of the Buffoons\' greatest mistake, Maryn used the last of her power to send them back through time. Unaware of what had happened, the Buffoons awoke deep beneath Chronicle in the ancient Folley Mines, long before the town\'s downfall.',
      'Trapped beneath the surface, they uncovered the forgotten history of the mines and the darkness that had taken root within them.',
      'Among those they encountered was the Postmaster, a man driven to madness by an ancient curse. Tormented by a malevolent force, he believed himself responsible for the death of his wife and the horrors that had consumed the mines. Though feared by many, the Buffoons discovered he was not evil, but another victim of a far greater power.',
      'That power was Entropy.',
      'A being of pure corruption, Entropy was the true master behind the Overseers, manipulating events from the shadows long before Chronicle ever existed. As the Buffoons ventured deeper into the mines, they faced countless trials in an attempt to stop the growing darkness before it could consume the future.',
      'In the end, they failed.',
      'Entropy was never defeated, and history continued exactly as it always had. The Buffoons unknowingly fulfilled the very events that would lead to the fall of Chronicle, creating a closed time loop between the stories of Chronicle and The Folley Mines.',
      'The past could not be changed. It had already happened.',
    ],
  },
];

const STATUS_STYLES: Record<LoreEntry['status'], { label: string; classes: string }> = {
  complete: { label: 'Concluded',  classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' },
  ongoing:  { label: 'Ongoing',    classes: 'bg-amber-500/10  text-amber-400  border-amber-500/25'  },
  unknown:  { label: 'Unknown',    classes: 'bg-slate-500/10  text-slate-400  border-slate-500/25'  },
};

function LoreCard({ entry, index }: { entry: LoreEntry; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const status = STATUS_STYLES[entry.status];
  const isFirst = index === 0;

  return (
    <div className="relative">
      {/* Connector line from spine to dot */}
      <div className="absolute left-0 top-6 w-8 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />

      {/* Spine dot */}
      <div
        className={`absolute -left-[1px] top-4 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
          open
            ? 'bg-amber-400 border-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.4)]'
            : 'bg-slate-700 border-slate-600'
        }`}
      />

      {/* Card */}
      <div className="ml-10">
        <button
          onClick={() => setOpen(o => !o)}
          className={`w-full text-left group rounded-2xl border transition-all duration-300 overflow-hidden ${
            open
              ? 'bg-slate-900/80 border-amber-500/20 shadow-lg shadow-amber-900/10'
              : 'bg-slate-900/40 border-white/6 hover:border-amber-500/15 hover:bg-slate-900/60'
          }`}
        >
          <div className="flex items-start justify-between gap-4 px-6 py-5">
            <div className="flex items-start gap-4 min-w-0">
              <div className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                open ? 'bg-amber-500/15 text-amber-400' : 'bg-white/5 text-slate-500 group-hover:text-amber-500/70'
              }`}>
                <Scroll className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {entry.era && (
                    <span className="text-xs font-semibold tracking-widest text-amber-500/70 uppercase">{entry.era}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{entry.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{entry.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 pt-1">
              <span className={`hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${status.classes}`}>
                {status.label}
              </span>
              {open ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-1 px-6 pt-2 pb-7 bg-slate-900/40 border border-t-0 border-amber-500/10 rounded-b-2xl space-y-4">
            <div className="w-12 h-px bg-amber-500/25 mb-5" />
            {entry.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-[15px]">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Lore() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-crimson-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6 shadow-lg shadow-amber-900/20">
            <BookOpen className="w-7 h-7 text-amber-400" />
          </div>
          <p className="font-pixel text-xs text-amber-500/80 tracking-widest mb-4">THE CHRONICLES</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            Lore of<br /><span className="text-amber-400">BuffoonCraft</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            The world has a long memory. Explore the events, places, and forces that have shaped Buffooncraft's history — from the earliest settlements to the shadows still lurking in the dark.
          </p>
        </div>
      </div>

      {/* Timeline tree */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-transparent" />

          <div className="space-y-6 pl-1">
            {LORE.map((entry, i) => (
              <LoreCard key={entry.id} entry={entry} index={i} />
            ))}

            {/* Future entries hint */}
            <div className="relative">
              <div className="absolute -left-[1px] top-4 w-3 h-3 rounded-full border-2 border-slate-700 bg-slate-800" />
              <div className="absolute left-0 top-6 w-8 h-px bg-gradient-to-r from-slate-700/40 to-transparent" />
              <div className="ml-10 px-6 py-5 rounded-2xl border border-dashed border-white/8 bg-transparent">
                <p className="text-slate-600 text-sm italic">More chapters are yet to be written...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
