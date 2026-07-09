import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface BuffoonApplication {
  id: string;
  ign: string;
  discord_username: string;
  platform: string;
  channel_url: string;
  follower_count: string;
  content_style: string;
  why_apply: string;
  status: ApplicationStatus;
  created_at: string;
}
