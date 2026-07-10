
CREATE POLICY "public_read_gallery" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery');

CREATE POLICY "authenticated_upload_gallery" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery');
