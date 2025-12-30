-- Roam MVP schema (tight + minimal)

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  age_verified boolean not null default false,
  intent text not null default 'open',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  -- score is internal-only: no public rating
  score_hidden integer not null default 0,
  score_confidence integer not null default 0
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  a uuid not null references auth.users(id) on delete cascade,
  b uuid not null references auth.users(id) on delete cascade,
  status text not null default 'open',
  created_at timestamp with time zone not null default now(),
  expires_at timestamp with time zone not null default (now() + interval '30 days')
);

create unique index if not exists matches_unique_pair on public.matches (least(a,b), greatest(a,b));

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  sender uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.after_feedback (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  rater uuid not null references auth.users(id) on delete cascade,
  again boolean not null,
  respectful boolean not null,
  created_at timestamp with time zone not null default now()
);

create unique index if not exists after_feedback_unique on public.after_feedback (match_id, rater);
