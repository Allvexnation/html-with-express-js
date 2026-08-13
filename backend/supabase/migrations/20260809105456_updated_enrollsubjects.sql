-- Create enrollments table for student-subject enrollment with JSON subjects
drop table if exists public.enrollments cascade;

create table public.enrollments (
    id text primary key,
    student_id text not null references public.users_htmx(id) on delete cascade,
    subject_ids jsonb not null default '[]'::jsonb,
    enrollment_date date not null default current_date,
    status text not null default 'active' check (status in ('active', 'inactive', 'completed', 'dropped')),
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp,
    unique(student_id)
);

-- Create indexes for faster queries
create index if not exists idx_enrollments_student_id on public.enrollments(student_id);
create index if not exists idx_enrollments_status on public.enrollments(status);
create index if not exists idx_enrollments_subject_ids on public.enrollments using gin(subject_ids);
