import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, AlertCircle, Send, Youtube, Twitch, Users, Link } from 'lucide-react';

interface FormData {
  ign: string;
  discord_username: string;
  platform: string;
  channel_url: string;
  follower_count: string;
  content_style: string;
  why_apply: string;
}

const EMPTY: FormData = {
  ign: '',
  discord_username: '',
  platform: '',
  channel_url: '',
  follower_count: '',
  content_style: '',
  why_apply: '',
};

const PLATFORMS = [
  { value: 'YouTube', label: 'YouTube', icon: Youtube },
  { value: 'Twitch',  label: 'Twitch',  icon: Twitch  },
  { value: 'TikTok',  label: 'TikTok',  icon: Users   },
  { value: 'Other',   label: 'Other',   icon: Link    },
];

function Field({
  label, hint, required = true, children,
}: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-200 mb-1.5">
        {label} {required && <span className="text-crimson-400">*</span>}
      </label>
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      {children}
    </div>
  );
}

const inputBase =
  'w-full px-4 py-3 bg-slate-800/60 border border-white/8 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 transition-all';

export default function Apply() {
  const [form, setForm]     = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }));

  const sendDiscordWebhook = async (data: FormData, createdAt: string) => {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: 'New Buffoon Application',
            color: 0x22c55e,
            fields: [
              { name: 'IGN',             value: data.ign.trim(),              inline: true  },
              { name: 'Discord',         value: data.discord_username.trim(), inline: true  },
              { name: 'Platform',        value: data.platform,                inline: true  },
              { name: 'Channel URL',     value: data.channel_url.trim(),      inline: false },
              { name: 'Followers',       value: data.follower_count.trim() || 'Not provided', inline: true },
              { name: 'Status',          value: 'pending',                    inline: true  },
              { name: 'Content Style',   value: data.content_style.trim(),    inline: false },
              { name: 'Why Apply',       value: data.why_apply.trim(),        inline: false },
            ],
            footer: { text: `Submitted at ${new Date(createdAt).toUTCString()}` },
          }],
        }),
      });
    } catch {
      // Discord failure does not block submission
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.platform) { setError('Please select a platform.'); return; }

    setLoading(true);
    const { data: inserted, error: dbError } = await supabase
      .from('buffoon_applications')
      .insert({
        ign:              form.ign.trim(),
        discord_username: form.discord_username.trim(),
        platform:         form.platform,
        channel_url:      form.channel_url.trim(),
        follower_count:   form.follower_count.trim(),
        content_style:    form.content_style.trim(),
        why_apply:        form.why_apply.trim(),
      })
      .select('created_at')
      .single();
    setLoading(false);

    if (dbError) {
      setError('Something went wrong submitting your application. Please try again.');
      return;
    }

    await sendDiscordWebhook(form, inserted?.created_at ?? new Date().toISOString());
    setSuccess(true);
    setForm(EMPTY);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/BC_logo_blank_(Phone).png" alt="BuffoonCraft" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-lg" />
          <p className="font-pixel text-xs text-brand-400 tracking-widest mb-4">CREATOR APPLICATIONS</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5">
            Become a <span className="text-brand-400">Buffoon</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Are you a content creator who loves Minecraft? We're always looking for passionate
            people to join the Buffoon crew, create content, and help grow our community.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">

        {/* Right: the form */}
        <div>
          {success ? (
            <div className="bg-slate-900/60 border border-brand-500/30 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-brand-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Application Received!</h2>
              <p className="text-slate-400 leading-relaxed max-w-sm mx-auto mb-8">
                Thanks for applying! We review all applications personally and will reach out to you
                on Discord if you're selected. Keep an eye on your DMs.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-slate-900/60 border border-white/8 rounded-2xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-2">Application Form</h2>

              {/* Requirements */}
              <div className="bg-crimson-500/8 border border-crimson-500/20 rounded-xl p-5">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-crimson-400" />
                  Requirements
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-crimson-500 flex-shrink-0" />Active on at least one content platform</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-crimson-500 flex-shrink-0" />Must have a Discord account</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-crimson-500 flex-shrink-0" />Genuine passion for Minecraft and community</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Minecraft IGN" hint="Your in-game username">
                  <input
                    type="text"
                    required
                    value={form.ign}
                    onChange={set('ign')}
                    placeholder="YourUsername123"
                    className={inputBase}
                  />
                </Field>

                <Field label="Discord Username" hint="e.g. username#0000 or @username">
                  <input
                    type="text"
                    required
                    value={form.discord_username}
                    onChange={set('discord_username')}
                    placeholder="username#0000"
                    className={inputBase}
                  />
                </Field>
              </div>

              <Field label="Primary Platform" hint="Where do you publish your content?">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PLATFORMS.map(p => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, platform: p.value }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold text-sm transition-all ${
                        form.platform === p.value
                          ? 'bg-brand-500/20 border-brand-500/60 text-brand-300'
                          : 'bg-slate-800/40 border-white/8 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <p.icon className="w-5 h-5" />
                      {p.label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Channel / Profile URL" hint="Link to your channel or profile page">
                  <input
                    type="url"
                    required
                    value={form.channel_url}
                    onChange={set('channel_url')}
                    placeholder="https://youtube.com/@..."
                    className={inputBase}
                  />
                </Field>

                <Field label="Approximate Follower Count" required={false}>
                  <input
                    type="text"
                    value={form.follower_count}
                    onChange={set('follower_count')}
                    placeholder="e.g. 1 200"
                    className={inputBase}
                  />
                </Field>
              </div>

              <Field label="Content Style" hint="What kind of content do you make? (builds, let's plays, tutorials, etc.)">
                <textarea
                  required
                  rows={3}
                  value={form.content_style}
                  onChange={set('content_style')}
                  placeholder="Tell us about the type of content you create..."
                  className={`${inputBase} resize-none`}
                />
              </Field>

              <Field label="Why do you want to be a Buffoon?" hint="Tell us what BuffoonCraft means to you and how you'd contribute to the community.">
                <textarea
                  required
                  rows={5}
                  value={form.why_apply}
                  onChange={set('why_apply')}
                  placeholder="Share your story..."
                  className={`${inputBase} resize-none`}
                />
              </Field>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-crimson-500/10 border border-crimson-500/30 rounded-xl text-crimson-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-500 hover:bg-brand-400 disabled:bg-brand-700 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/30 text-lg active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-xs text-slate-600 text-center">
                We read every application. You'll hear back via Discord DM if you're selected.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
