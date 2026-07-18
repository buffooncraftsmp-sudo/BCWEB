import { useState } from 'react';
import { X, Images } from 'lucide-react';

function gallery(season: number, slug: string) {
  return {
    thumb: `/gallery/s${season}/${slug}-thumb.webp`,
    full: `/gallery/s${season}/${slug}-full.webp`,
  };
}

const ITEMS = [
  // Season 1
  { ...gallery(1, 'KysBarns'),           season: 1, label: "KY's Barns"          },
  { ...gallery(1, 'Kysbase'),            season: 1, label: "KY's Base"            },
  { ...gallery(1, 'novaguardianfarm'),   season: 1, label: "Nova's Guardian Farm" },
  { ...gallery(1, 'novasbase2'),         season: 1, label: "Nova's Base"          },
  { ...gallery(1, 'Novasbase'),          season: 1, label: "Nova's Base"          },
  { ...gallery(1, 'redstonechurch'),     season: 1, label: 'Redstone Church'      },
  { ...gallery(1, 'redstonekingdom'),    season: 1, label: 'Redstone Kingdom'     },
  // Season 2
  { ...gallery(2, 'spawn'),              season: 2, label: 'Spawn'                },
  { ...gallery(2, 'flyingsbase'),        season: 2, label: "Flying's Base"        },
  { ...gallery(2, 'flyingstrain'),       season: 2, label: "Flying's Train"       },
  { ...gallery(2, 'KysBase'),            season: 2, label: "KY's Base"            },
  { ...gallery(2, 'kornysbase'),         season: 2, label: "Korny's Base"         },
  { ...gallery(2, 'NovasBase'),          season: 2, label: "Nova's Base"          },
  { ...gallery(2, 'Turbosbase'),         season: 2, label: "Turbo's Base"         },
  { ...gallery(2, 'thundersbase'),       season: 2, label: "Thunder's Base"       },
  { ...gallery(2, 'thundrescanal'),      season: 2, label: "Thunder's Canal"      },
  { ...gallery(2, 'shutsbase'),          season: 2, label: "Shut's Base"          },
  { ...gallery(2, 'nantyscafe'),         season: 2, label: "Nanty's Cafe"         },
  { ...gallery(2, 'chickenmafiachurch'), season: 2, label: 'Chicken Mafia Church' },
  { ...gallery(2, 'greenershypercube'),  season: 2, label: "Greener's Hypercube" },
  // Season 3
  { ...gallery(3, 'AncientChronicle'),   season: 3, label: 'Ancient Chronicle'    },
  { ...gallery(3, 'CHEOcharitybuild2'),  season: 3, label: 'CHEO Charity Build 2' },
  { ...gallery(3, 'CHEOcharitybuild'),   season: 3, label: 'CHEO Charity Build'   },
  { ...gallery(3, 'flyingnovamobfarm'),  season: 3, label: "Flying & Nova's Mob Farm" },
  { ...gallery(3, 'Greenersbase'),       season: 3, label: "Greener's Base"       },
  { ...gallery(3, 'Kornysbase'),         season: 3, label: "Korny's Base"         },
  { ...gallery(3, 'kyscave'),            season: 3, label: "KY's Cave"            },
  { ...gallery(3, 'kyspirateloot'),      season: 3, label: "KY's Pirate Loot"     },
  { ...gallery(3, 'kystower'),           season: 3, label: "KY's Tower"           },
  { ...gallery(3, 'NebsBaase'),          season: 3, label: "Neb's Base"           },
  { ...gallery(3, 'NovasBase'),          season: 3, label: "Nova's Base"          },
  { ...gallery(3, 'season3event'),       season: 3, label: 'Season 3 Event'       },
  { ...gallery(3, 'shutsbase'),          season: 3, label: "Shut's Base"          },
  { ...gallery(3, 'shutslibrary'),       season: 3, label: "Shut's Library"       },
  { ...gallery(3, 'spawn'),              season: 3, label: 'Spawn'                },
  { ...gallery(3, 'TheCaveEscapeshaft'), season: 3, label: 'The Cave Escape Shaft'},
  { ...gallery(3, 'theobelisk'),         season: 3, label: 'The Obelisk'          },
  { ...gallery(3, 'thepostmasters'),     season: 3, label: 'The Postmasters'      },
  { ...gallery(3, 'WarriorsBase'),       season: 3, label: "Warrior's Base"       },
  // Season 4
  { ...gallery(4, 'FlyingNovaEndProject1'), season: 4, label: "Flying & Nova's End Project" },
  { ...gallery(4, 'FlyingNovaEndProject2'), season: 4, label: "Flying & Nova's End Project" },
  { ...gallery(4, 'SpawnPub'),              season: 4, label: 'Spawn Pub'              },
  { ...gallery(4, 'NovasBase'),             season: 4, label: "Nova's Base"            },
  { ...gallery(4, 'NovaCitadelChapel'),     season: 4, label: "Nova's Citadel Chapel"  },
  { ...gallery(4, 'novalibrary'),           season: 4, label: "Nova's Library"         },
  { ...gallery(4, 'KornysBase'),            season: 4, label: "Korny's Base"           },
  { ...gallery(4, 'shutsBase'),             season: 4, label: "Shut's Base"            },
  { ...gallery(4, 'NebsBase'),              season: 4, label: "Neb's Base"             },
  { ...gallery(4, 'TurboBase'),             season: 4, label: "Turbo's Base"           },
  { ...gallery(4, 'FlyingsBase'),           season: 4, label: "Flying's Base"          },
  { ...gallery(4, 'KysBase'),               season: 4, label: "KY's Base"             },
  { ...gallery(4, 'FlyingsBase2'),          season: 4, label: "Flying's Base"          },
  { ...gallery(4, 'KysAndThunderView'),     season: 4, label: "KY's & Thunder's View"  },
  { ...gallery(4, 'ThunderBase'),           season: 4, label: "Thunder's Base"         },
  { ...gallery(4, 'ThundersVillagers'),     season: 4, label: "Thunder's Villagers"    },
  // Season 6
  { ...gallery(6, 'buffoonskies_1'),     season: 6, label: 'Buffoon Skies'        },
];

const SEASONS = [1, 2, 3, 4, 6] as const;

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
        src={item.thumb}
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
    .filter(i => !failed.has(i.thumb));

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
              key={`${item.thumb}-${i}`}
              item={item}
              onOpen={() => setLightbox(item)}
              onFail={() => markFailed(item.thumb)}
              failed={failed.has(item.thumb)}
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
              src={lightbox.full}
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
