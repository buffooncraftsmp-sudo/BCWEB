import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Discord webhook not configured' });
  }

  const {
    ign,
    discord_username,
    platform,
    channel_url,
    follower_count,
    content_style,
    why_apply,
    created_at,
  } = req.body;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: 'New Buffoon Application',
          color: 0x22c55e,
          fields: [
            { name: 'IGN',           value: ign ?? 'N/A',              inline: true  },
            { name: 'Discord',       value: discord_username ?? 'N/A', inline: true  },
            { name: 'Platform',      value: platform ?? 'N/A',         inline: true  },
            { name: 'Channel URL',   value: channel_url ?? 'N/A',      inline: false },
            { name: 'Followers',     value: follower_count || 'Not provided', inline: true },
            { name: 'Status',        value: 'pending',                  inline: true  },
            { name: 'Content Style', value: content_style ?? 'N/A',    inline: false },
            { name: 'Why Apply',     value: why_apply ?? 'N/A',        inline: false },
          ],
          footer: { text: `Submitted at ${new Date(created_at ?? Date.now()).toUTCString()}` },
        }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Discord webhook error:', response.status, text);
      return res.status(502).json({ error: 'Discord webhook failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Discord webhook exception:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
