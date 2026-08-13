-- Drop existing table to start fresh
drop table if exists public.users_htmx cascade;

-- Create users table for HTMX authentication
create table public.users_htmx (
    id text primary key,
    username text unique not null,
    email text unique not null,
    password text not null,
    full_name text not null,
    address text not null,
    cell_number text not null,
    date_of_birth date not null,
    age integer not null,
    gender text not null check (gender in ('male', 'female', 'other')),
    hobbies text not null check (hobbies in ('coding', 'reading', 'music', 'art', 'gaming')),
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
);

-- Create indexes for faster queries
create index if not exists idx_users_htmx_username on public.users_htmx(username);
create index if not exists idx_users_htmx_email on public.users_htmx(email);
create index if not exists idx_users_htmx_id on public.users_htmx(id);