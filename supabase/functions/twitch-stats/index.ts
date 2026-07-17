import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CHANNELS = [
  "supernova_relic",
  "realfoolishsage",
  "shutmountain409fb",
  "flyingvillager",
  "lonestarr_82",
  "princessnebula",
  "chescas_genie",
  "thunderhand64_gaming",
  "ky_creates",
  "k46sleepwalker",
  "luxjgaming",
  "skipjack81",
  "callmeevegaming",
  "1playergamer",
  "dorasplorer",
  "xeska_dbe",
  "angelbyu",
];

async function getTwitchToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const json = await res.json();
  return json.access_token as string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("TWITCH_CLIENT_ID");
    const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: "Twitch credentials not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = await getTwitchToken(clientId, clientSecret);
    const authHeaders = { "Client-ID": clientId, Authorization: `Bearer ${token}` };

    const streamQuery = CHANNELS.map((c) => `user_login=${encodeURIComponent(c)}`).join("&");
    const userQuery = CHANNELS.map((c) => `login=${encodeURIComponent(c)}`).join("&");

    const [streamsRes, usersRes] = await Promise.all([
      fetch(`https://api.twitch.tv/helix/streams?${streamQuery}&first=100`, { headers: authHeaders }),
      fetch(`https://api.twitch.tv/helix/users?${userQuery}`, { headers: authHeaders }),
    ]);

    if (!streamsRes.ok) throw new Error(`Streams API failed: ${streamsRes.status}`);
    if (!usersRes.ok) throw new Error(`Users API failed: ${usersRes.status}`);

    const [streamsJson, usersJson] = await Promise.all([streamsRes.json(), usersRes.json()]);

    const liveStreams = (streamsJson.data as any[]).map((s) => ({
      login: s.user_login as string,
      displayName: s.user_name as string,
      title: s.title as string,
      viewerCount: s.viewer_count as number,
      thumbnailUrl: (s.thumbnail_url as string)
        .replace("{width}", "440")
        .replace("{height}", "248"),
      startedAt: s.started_at as string,
    }));

    const liveByLogin = new Map(liveStreams.map((s) => [s.login.toLowerCase(), s]));

    const userData: any[] = usersJson.data as any[];

    // Fetch follower counts for each channel in parallel
    const followerCounts = await Promise.all(
      userData.map(async (u: any) => {
        try {
          const res = await fetch(
            `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${u.id}&first=1`,
            { headers: authHeaders }
          );
          if (!res.ok) return 0;
          const json = await res.json();
          return (json.total as number) ?? 0;
        } catch {
          return 0;
        }
      })
    );

    const totalFollowers = followerCounts.reduce((sum, n) => sum + n, 0);

    const users = userData.map((u: any, i: number) => {
      const live = liveByLogin.get((u.login as string).toLowerCase());
      return {
        login: u.login as string,
        displayName: u.display_name as string,
        profileImageUrl: u.profile_image_url as string,
        description: u.description as string,
        followerCount: followerCounts[i],
        isLive: !!live,
        viewerCount: live?.viewerCount ?? 0,
        streamTitle: live?.title ?? null,
        thumbnailUrl: live?.thumbnailUrl ?? null,
      };
    });

    const totalViewers = liveStreams.reduce((sum, s) => sum + s.viewerCount, 0);

    return new Response(
      JSON.stringify({ totalViewers, liveCount: liveStreams.length, totalFollowers, streams: liveStreams, users }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
