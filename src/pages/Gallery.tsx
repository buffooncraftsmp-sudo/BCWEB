import { useState } from 'react';
import { X, Images } from 'lucide-react';

function gallery(season: number, slug: string) {
  return {
    thumb: `/gallery/s${season}/${slug}-thumb.webp`,
    full: `/gallery/s${season}/${slug}-full.webp`,
  };
}

function art(slug: string) {
  return {
    thumb: `/gallery/art/${slug}-thumb.webp`,
    full: `/gallery/art/${slug}-full.webp`,
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
  // Season 5
  { ...gallery(5, 'Season5Logo'),        season: 5, label: 'Season 5'            },
  { ...gallery(5, 'spawn'),              season: 5, label: 'Spawn'               },
  { ...gallery(5, 'FlyingsBase'),        season: 5, label: "Flying's Base"       },
  { ...gallery(5, 'FlyingsBase2'),       season: 5, label: "Flying's Base"       },
  { ...gallery(5, 'FlyingsBase3'),       season: 5, label: "Flying's Base"       },
  { ...gallery(5, 'FlyingNovasPortal'),  season: 5, label: "Flying & Nova's Portal" },
  { ...gallery(5, 'NovaBase'),           season: 5, label: "Nova's Base"         },
  { ...gallery(5, 'GreenersBase'),       season: 5, label: "Greener's Base"      },
  { ...gallery(5, 'KornysBase'),         season: 5, label: "Korny's Base"        },
  { ...gallery(5, 'LonesBase'),          season: 5, label: "Lone's Base"         },
  { ...gallery(5, 'LonesStarterBase'),   season: 5, label: "Lone's Starter Base" },
  { ...gallery(5, 'LonesMobFarm'),       season: 5, label: "Lone's Mob Farm"     },
  { ...gallery(5, 'LonesPortal'),        season: 5, label: "Lone's Portal"       },
  { ...gallery(5, 'ShutsBase'),          season: 5, label: "Shut's Base"        },
  { ...gallery(5, 'ThundersPub'),        season: 5, label: "Thunder's Pub"      },
  { ...gallery(5, 'ThundersIronFarm'),   season: 5, label: "Thunder's Iron Farm" },
  { ...gallery(5, 'RailGun'),            season: 5, label: 'Rail Gun'            },
  { ...gallery(5, 'TheGildedCastle'),    season: 5, label: 'The Gilded Castle'   },
  { ...gallery(5, 'TheGildedThroneRoom'),season: 5, label: 'The Gilded Throne Room' },
  { ...gallery(5, 'HalloweenBuild'),     season: 5, label: 'Halloween Build'     },
  { ...gallery(5, 'HalloweenMaze'),      season: 5, label: 'Halloween Maze'      },
  { ...gallery(5, 'TrickOrTreatEvent'),  season: 5, label: 'Trick or Treat Event' },
  { ...gallery(5, 'MoonEvent'),          season: 5, label: 'Moon Event'          },
  { ...gallery(5, 'TheDefeatedMoon'),    season: 5, label: 'The Defeated Moon'   },
  // Season 6
  { ...gallery(6, 'buffoonskies_1'),     season: 6, label: 'Buffoon Skies'        },
];

const SEASONS = [1, 2, 3, 4, 5, 6] as const;

const ART_ITEMS = [
  { ...art('Buffooncraft'),  title: 'Buffooncraft',  artist: "Dora's Daughter" },
  { ...art('Buffoonskies'),  title: 'Buffoonskies',  artist: 'Flying Villager' },
  { ...art('Tsundere'),      title: 'Tsundere',      artist: 'Flying Villager' },
  { ...art('Tylone'),        title: 'Tylone',        artist: 'Flying Villager' },
];

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

function ArtCard({
  item,
  onOpen,
  onFail,
  failed,
}: {
  item: (typeof ART_ITEMS)[number];
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
      {!loaded && (
        <div className="w-full aspect-square bg-slate-800 animate-pulse rounded-xl" />
      )}
      <img
        src={item.thumb}
        alt={item.title}
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
        <p className="font-pixel text-[9px] text-brand-400 tracking-widest">ART</p>
        <p className="text-xs font-bold text-white mt-0.5">{item.title}</p>
        <p className="text-[11px] text-slate-400">by {item.artist}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<number | null | 'art'>(null);
  const [lightbox, setLightbox] = useState<(typeof ITEMS)[number] | null>(null);
  const [artLightbox, setArtLightbox] = useState<(typeof ART_ITEMS)[number] | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const markFailed = (src: string) =>
    setFailed(prev => new Set(prev).add(src));

  const visible = (filter === null ? ITEMS : filter === 'art' ? [] : ITEMS.filter(i => i.season === filter))
    .filter(i => !failed.has(i.thumb));

  const visibleArt = ART_ITEMS.filter(i => !failed.has(i.thumb));

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

      {/* Filters */}
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
          <button
            onClick={() => setFilter('art')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'art'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            Art ({ART_ITEMS.length})
          </button>
        </div>
      </div>

      {filter === 'art' ? (
        /* Art grid */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {ART_ITEMS.map((item, i) => (
              <ArtCard
                key={`${item.thumb}-${i}`}
                item={item}
                onOpen={() => setArtLightbox(item)}
                onFail={() => markFailed(item.thumb)}
                failed={failed.has(item.thumb)}
              />
            ))}
          </div>

          {visibleArt.length === 0 && (
            <p className="text-center text-slate-500 py-24">No art yet.</p>
          )}
        </div>
      ) : (
        /* Grid */
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
      )}

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

      {/* Art lightbox */}
      {artLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
          onClick={() => setArtLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setArtLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={artLightbox.full}
              alt={artLightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="font-pixel text-[10px] text-brand-400 tracking-widest mb-1">ART</p>
              <p className="text-sm font-bold text-white">{artLightbox.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">by {artLightbox.artist}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
