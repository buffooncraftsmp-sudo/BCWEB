const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface TwitchUserStatus {
  login: string;
  displayName: string;
  profileImageUrl: string;
  description: string;
  followerCount: number;
  isLive: boolean;
  viewerCount: number;
  streamTitle: string | null;
  thumbnailUrl: string | null;
}

export interface TwitchStats {
  totalViewers: number;
  liveCount: number;
  totalFollowers: number;
  users: TwitchUserStatus[];
}

export async function fetchTwitchStats(): Promise<TwitchStats | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/twitch-stats`, {
      headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.error) return null;
    if (typeof json.totalViewers !== 'number' || typeof json.liveCount !== 'number') return null;
    return {
      totalViewers: json.totalViewers,
      liveCount: json.liveCount,
      totalFollowers: typeof json.totalFollowers === 'number' ? json.totalFollowers : 0,
      users: Array.isArray(json.users) ? json.users : [],
    };
  } catch {
    return null;
  }
}
