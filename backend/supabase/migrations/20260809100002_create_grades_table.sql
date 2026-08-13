-- Create grades table
drop table if exists public.grades cascade;

create table public.grades (
    id text primary key,
    student_id text not null references public.users_htmx(id) on delete cascade,
    subject_id text not null references public.subjects(id) on delete cascade,
    grade numeric not null check (grade >= 0 and grade <= 100),
    remarks text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp,
    unique(student_id, subject_id)
);

-- Create indexes for faster queries
create index if not exists idx_grades_student_id on public.grades(student_id);
create index if not exists idx_grades_subject_id on public.grades(subject_id);
