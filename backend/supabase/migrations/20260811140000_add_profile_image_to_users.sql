-- Add profile_image column to users_htmx table
alter table public.users_htmx 
add column profile_image text;
