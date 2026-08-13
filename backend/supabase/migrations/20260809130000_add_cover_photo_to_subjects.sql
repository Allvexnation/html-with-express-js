-- Add cover_photo column to subjects table
alter table public.subjects 
add column cover_photo text;

-- Add index for cover_photo
create index if not exists idx_subjects_cover_photo on public.subjects(cover_photo);
