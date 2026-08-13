-- Create admin table for admin authentication
drop table if exists public.htmx_admin cascade;

create table public.htmx_admin (
    id text primary key,
    username text unique not null,
    email text unique not null,
    password text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
);

-- Create indexes for faster queries
create index if not exists idx_htmx_admin_username on public.htmx_admin(username);
create index if not exists idx_htmx_admin_email on public.htmx_admin(email);
create index if not exists idx_htmx_admin_id on public.htmx_admin(id);
