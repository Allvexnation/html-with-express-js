-- Create subject completions table to track individual subject completion
drop table if exists public.subject_completions cascade;

create table public.subject_completions (
    id text primary key,
    student_id text not null references public.users_htmx(id) on delete cascade,
    subject_id text not null references public.subjects(id) on delete cascade,
    completed_at timestamp with time zone default current_timestamp,
    created_at timestamp with time zone default current_timestamp,
    unique(student_id, subject_id)
);

-- Create indexes for faster queries
create index if not exists idx_subject_completions_student_id on public.subject_completions(student_id);
create index if not exists idx_subject_completions_subject_id on public.subject_completions(subject_id);
