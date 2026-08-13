-- Create subjects table
drop table if exists public.subjects cascade;

create table public.subjects (
    id text primary key,
    subject_name text unique not null,
    subject_code text unique not null,
    teacher_name text,
    description text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
);

-- Create indexes for faster queries
create index if not exists idx_subjects_name on public.subjects(subject_name);
create index if not exists idx_subjects_code on public.subjects(subject_code);
create index if not exists idx_subjects_teacher on public.subjects(teacher_name);
