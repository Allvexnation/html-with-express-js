create table public.users_htmx (

    id uuid primary key default gen_random_uuid(),

    username text not null,

    email text unique not null,

    password text not null,

    created_at timestamp default now()

);