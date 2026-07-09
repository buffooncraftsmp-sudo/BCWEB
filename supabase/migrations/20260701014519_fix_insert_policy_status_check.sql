-- Tighten the INSERT policy so submitters cannot set their own status.
-- Only 'pending' is allowed; admins change status via the dashboard.
DROP POLICY IF EXISTS "public_insert_applications" ON buffoon_applications;
CREATE POLICY "public_insert_applications"
ON buffoon_applications FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');
