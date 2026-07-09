import { BookOpen, Scroll } from 'lucide-react';

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
  {
    id: 'time-of-peace',
    title: 'A Time of Peace',
    location: 'The World',
    era: 'Season 4',
    status: 'complete',
    paragraphs: [
      'For a time, the world was quiet.',
      'With the horrors of Chronicle and the Folley Mines behind them, the Buffoons enjoyed a long period of peace. Great cities rose across the landscape, ambitious projects flourished, and life returned to normal. There were no ancient evils to battle, no mysterious dungeons to conquer, and no spirits calling for their aid.',
      'The Buffoons believed their greatest challenges were behind them.',
      'But they were wrong.',
      'Hidden beyond the reach of the world, the Overseers had not been defeated. They had simply been watching.',
      'From the shadows, they observed every decision the Buffoons made, every strength they displayed, and every weakness they revealed. They learned how the Buffoons fought, how they worked together, and, most importantly, what they valued most.',
      'The peace was never an end.',
      'It was merely the silence before the storm.',
      'When the Overseers finally returned, they would do so armed not only with ancient power, but with the knowledge needed to tear the Buffoons apart from within.',
    ],
  },
  {
    id: 'gilded-kingdom',
    title: 'The Gilded Kingdom',
    location: 'The Gilded Kingdom',
    era: 'Season 5',
    status: 'complete',
    paragraphs: [
      'Drawn far from the ruins of Chronicle, the Buffoons journeyed to the distant Gilded Kingdom, a land of immense wealth, towering castles, and ancient secrets. Hidden within the heart of an abandoned fortress rested the legendary Gilded Throne.',
      'Believing it to be a symbol of leadership, the Buffoons took turns sitting upon the throne, each ruling the kingdom for a short time while appointing trusted advisers to help govern. To them, it was simply another challenge.',
      'But the throne had never been a reward.',
      'It was a trap.',
      'Forged by the Overseers long ago, the Gilded Throne was designed to corrupt those who sought power. With every new ruler, ambition grew stronger, trust began to fade, and the unity that had carried the Buffoons through every previous trial slowly started to fracture.',
      'Above them, the world itself was under the watchful gaze of the Moon. More than a celestial body, it had become an ever-present eye, silently observing every decision the Buffoons made and feeding the corruption that spread throughout the kingdom.',
      'Realising there was only one way to end the curse, the Buffoons launched an impossible assault on the Moon itself.',
      'Their journey ended among the stars, where they succeeded in destroying the Moon and breaking its hold over the world.',
      'Yet victory was incomplete.',
      'Amid the chaos, the Gilded Throne disappeared without a trace.',
      'Whether it was destroyed, hidden, or simply waiting for another ruler to claim it, nobody knows.',
      'Only time will reveal whether leaving the throne behind was the Buffoons\' greatest mistake... or their greatest mercy.',
    ],
  },
];

const STATUS_STYLES: Record<LoreEntry['status'], { label: string; classes: string }> = {
  complete: { label: 'Concluded', classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' },
  ongoing:  { label: 'Ongoing',   classes: 'bg-amber-500/10  text-amber-400  border-amber-500/25'  },
  unknown:  { label: 'Unknown',   classes: 'bg-slate-500/10  text-slate-400  border-slate-500/25'  },
};

function LoreCard({ entry }: { entry: LoreEntry }) {
  const status = STATUS_STYLES[entry.status];

  return (
    <div className="relative">
      {/* Connector line from spine to dot */}
      <div className="absolute left-0 top-6 w-8 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />

      {/* Spine dot */}
      <div className="absolute -left-[1px] top-4 w-3 h-3 rounded-full border-2 bg-amber-400 border-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.35)]" />

      {/* Card */}
      <div className="ml-10 bg-slate-900/70 border border-amber-500/15 rounded-2xl shadow-lg shadow-amber-900/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 border-b border-white/5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-amber-500/12 text-amber-400 flex items-center justify-center">
              <Scroll className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              {entry.era && (
                <span className="text-xs font-semibold tracking-widest text-amber-500/70 uppercase">{entry.era}</span>
              )}
              <h3 className="text-lg font-bold text-white leading-snug mt-0.5">{entry.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{entry.location}</p>
            </div>
          </div>
          <span className={`hidden sm:inline-flex flex-shrink-0 mt-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.classes}`}>
            {status.label}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          {entry.paragraphs.map((p, i) => (
            <p key={i} className="text-slate-300 leading-relaxed text-[15px]">{p}</p>
          ))}
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

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-transparent" />

          <div className="space-y-10 pl-1">
            {LORE.map((entry) => (
              <LoreCard key={entry.id} entry={entry} />
            ))}

            {/* Future entries hint */}
            <div className="relative">
              <div className="absolute -left-[1px] top-4 w-3 h-3 rounded-full border-2 border-slate-700 bg-slate-800" />
              <div className="absolute left-0 top-6 w-8 h-px bg-gradient-to-r from-slate-700/40 to-transparent" />
              <div className="ml-10 px-6 py-5 rounded-2xl border border-dashed border-white/8">
                <p className="text-slate-600 text-sm italic">More chapters are yet to be written...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
