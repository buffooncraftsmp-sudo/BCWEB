import { useState } from 'react';
import { X, Images } from 'lucide-react';

const STORAGE = 'https://hfvasgamqirubmamdvfo.supabase.co/storage/v1/object/public/gallery';

function thumbUrl(src: string): string {
  return src;
}

const ITEMS = [
  // Season 1
  { src: `${STORAGE}/s1/KysBarns.png`,                  season: 1, label: "KY's Barns"          },
  { src: `${STORAGE}/s1/Kysbase.png`,                   season: 1, label: "KY's Base"            },
  { src: `${STORAGE}/s1/novaguardianfarm.png`,          season: 1, label: "Nova's Guardian Farm" },
  { src: `${STORAGE}/s1/novasbase%20(2).png`,           season: 1, label: "Nova's Base"          },
  { src: `${STORAGE}/s1/Novasbase.png`,                 season: 1, label: "Nova's Base"          },
  { src: `${STORAGE}/s1/redstonechurch.png`,            season: 1, label: 'Redstone Church'      },
  { src: `${STORAGE}/s1/redstonekingdom.png`,           season: 1, label: 'Redstone Kingdom'     },
  // Season 2
  { src: `/s2spawne.png`,                               season: 2, label: 'Spawn'                },
  { src: `${STORAGE}/s2/flyingsbase.png`,               season: 2, label: "Flying's Base"        },
  { src: `${STORAGE}/s2/flyingstrain.png`,              season: 2, label: "Flying's Train"       },
  { src: `${STORAGE}/s2/KysBase.png`,                   season: 2, label: "KY's Base"            },
  { src: `${STORAGE}/s2/kornysbase.png`,                season: 2, label: "Korny's Base"         },
  { src: `${STORAGE}/s2/NovasBase.png`,                 season: 2, label: "Nova's Base"          },
  { src: `${STORAGE}/s2/Niovasbase.png`,                season: 2, label: "Niova's Base"         },
  { src: `${STORAGE}/s2/Turbosbase.png`,                season: 2, label: "Turbo's Base"         },
  { src: `${STORAGE}/s2/thundersbase.png`,              season: 2, label: "Thunder's Base"       },
  { src: `${STORAGE}/s2/thundrescanal.png`,             season: 2, label: "Thunder's Canal"      },
  { src: `${STORAGE}/s2/shutsbase.png`,                 season: 2, label: "Shut's Base"          },
  { src: `${STORAGE}/s2/nantyscafe.png`,                season: 2, label: "Nanty's Cafe"         },
  { src: `${STORAGE}/s2/chickenmafiachurch.png`,        season: 2, label: 'Chicken Mafia Church' },
  // Season 3
  { src: `${STORAGE}/s3/AncientChronicle.png`,         season: 3, label: 'Ancient Chronicle'    },
  { src: `${STORAGE}/s3/CHEOcharitybuild%20(2).png`,   season: 3, label: 'CHEO Charity Build 2' },
  { src: `${STORAGE}/s3/CHEOcharitybuild.png`,         season: 3, label: 'CHEO Charity Build'   },
  { src: `${STORAGE}/s3/flying%26novamobfarm.png`,     season: 3, label: "Flying & Nova's Mob Farm" },
  { src: `${STORAGE}/s3/Greenersbase.png`,             season: 3, label: "Greener's Base"       },
  { src: `${STORAGE}/s3/Kornysbase.png`,               season: 3, label: "Korny's Base"         },
  { src: `${STORAGE}/s3/kyscave.png`,                  season: 3, label: "KY's Cave"            },
  { src: `${STORAGE}/s3/kyspirateloot.png`,            season: 3, label: "KY's Pirate Loot"     },
  { src: `${STORAGE}/s3/kystower.png`,                 season: 3, label: "KY's Tower"           },
  { src: `${STORAGE}/s3/NebsBaase.png`,                season: 3, label: "Neb's Base"           },
  { src: `${STORAGE}/s3/NovasBase.png`,                season: 3, label: "Nova's Base"          },
  { src: `${STORAGE}/s3/season3event.png`,             season: 3, label: 'Season 3 Event'       },
  { src: `${STORAGE}/s3/shutsbase.png`,                season: 3, label: "Shut's Base"          },
  { src: `${STORAGE}/s3/shutslibrary.png`,             season: 3, label: "Shut's Library"       },
  { src: `${STORAGE}/s3/spawn.png`,                    season: 3, label: 'Spawn'                },
  { src: `${STORAGE}/s3/TheCaveEscapeshaft.png`,       season: 3, label: 'The Cave Escape Shaft'},
  { src: `${STORAGE}/s3/theobelisk.png`,               season: 3, label: 'The Obelisk'          },
  { src: `${STORAGE}/s3/thepostmasters.png`,           season: 3, label: 'The Postmasters'      },
  { src: `${STORAGE}/s3/WarriorsBase.png`,             season: 3, label: "Warrior's Base"       },
  // Season 6
  { src: `/buffoonskies_1.png`,                         season: 6, label: 'Buffoon Skies'        },
];

const SEASONS = [1, 2, 3, 6] as const;

function GalleryCard({
  item,
  onOpen,
  onFail,
  failed,
}: {
  item: (typeof ITEMS)[number];
  onOpen: () => void;
  onFail: () => void;
  failed: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  if (failed) return null;

  return (
    <div
      onClick={onOpen}
      className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group mb-3"
    >
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div className="w-full aspect-video bg-slate-800 animate-pulse rounded-xl" />
      )}
      <img
        src={thumbUrl(item.src)}
        alt={item.label}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={onFail}
        className={`w-full object-cover group-hover:scale-105 transition-all duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="font-pixel text-[9px] text-brand-400 tracking-widest">SEASON {item.season}</p>
        <p className="text-xs font-bold text-white mt-0.5">{item.label}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<(typeof ITEMS)[number] | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const markFailed = (src: string) =>
    setFailed(prev => new Set(prev).add(src));

  const visible = (filter === null ? ITEMS : ITEMS.filter(i => i.season === filter))
    .filter(i => !failed.has(i.src));

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Images className="w-5 h-5 text-brand-400" />
          <p className="font-pixel text-xs text-brand-400 tracking-widest">BUFFOONCRAFT</p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Gallery</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Screenshots, builds, and moments from every season of BuffoonCraft.
        </p>
      </div>

      {/* Season filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === null
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            All ({ITEMS.length})
          </button>
          {SEASONS.map(s => {
            const count = ITEMS.filter(i => i.season === s).length;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === s
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/8'
                }`}
              >
                Season {s} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {(filter === null ? ITEMS : ITEMS.filter(i => i.season === filter)).map((item, i) => (
            <GalleryCard
              key={`${item.src}-${i}`}
              item={item}
              onOpen={() => setLightbox(item)}
              onFail={() => markFailed(item.src)}
              failed={failed.has(item.src)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-slate-500 py-24">No images for this season yet.</p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="font-pixel text-[10px] text-brand-400 tracking-widest mb-1">SEASON {lightbox.season}</p>
              <p className="text-sm font-bold text-white">{lightbox.label}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
