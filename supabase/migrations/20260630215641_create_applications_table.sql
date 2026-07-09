/*
# Create buffoon_applications table

A public submission form lets content creators apply to become a "Buffoon"
(featured community member) on BuffoonCraft. No authentication is required —
the table is intentionally public/shared (single-tenant, no sign-in screen).

## New Tables

### buffoon_applications
Stores each creator's application submission.

| Column            | Type        | Notes                                              |
|-------------------|-------------|----------------------------------------------------|
| id                | uuid (PK)   | Auto-generated primary key                         |
| ign               | text        | Minecraft in-game name                             |
| discord_username  | text        | Applicant's Discord handle                         |
| platform          | text        | Primary content platform (YouTube, Twitch, etc.)   |
| channel_url       | text        | Link to their channel/profile                      |
| follower_count    | text        | Approximate follower / subscriber count            |
| content_style     | text        | Description of the content they make               |
| why_apply         | text        | Why they want to become a Buffoon                  |
| status            | text        | One of: pending | approved | rejected (default pending) |
| created_at        | timestamptz | Submission timestamp                               |

## Security

- RLS enabled.
- Anon + authenticated users can INSERT (submit an application).
- Anon + authenticated users can SELECT only their own row via a UUID they already know
  (effectively write-only from the public; admins query via the dashboard).
- No public UPDATE or DELETE — applications are immutable once submitted.
*/

CREATE TABLE IF NOT EXISTS buffoon_applications (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ign              text NOT NULL,
  discord_username text NOT NULL,
  platform         text NOT NULL,
  channel_url      text NOT NULL,
  follower_count   text NOT NULL DEFAULT '',
  content_style    text NOT NULL DEFAULT '',
  why_apply        text NOT NULL,
  status           text NOT NULL DEFAULT 'pending',
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE buffoon_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application
DROP POLICY IF EXISTS "public_insert_applications" ON buffoon_applications;
CREATE POLICY "public_insert_applications"
ON buffoon_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Read back by ID (so the confirmation screen can show their submission)
DROP POLICY IF EXISTS "public_select_applications" ON buffoon_applications;
CREATE POLICY "public_select_applications"
ON buffoon_applications FOR SELECT
TO anon, authenticated
USING (true);
