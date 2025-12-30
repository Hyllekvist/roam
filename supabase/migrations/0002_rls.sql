-- Enable RLS
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;
alter table public.after_feedback enable row level security;

-- Profiles: users can read their own profile and update selected fields
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Matches: only participants can read/update
create policy "matches_select_participants" on public.matches
  for select using (auth.uid() = user_a or auth.uid() = user_b);

create policy "matches_insert_own" on public.matches
  for insert with check (auth.uid() = user_a or auth.uid() = user_b);

-- Messages: participants only
create policy "messages_select_participants" on public.messages
  for select using (
    exists (
      select 1 from public.matches m
      where m.id = match_id and (auth.uid() = m.user_a or auth.uid() = m.user_b)
    )
  );

create policy "messages_insert_participants" on public.messages
  for insert with check (
    exists (
      select 1 from public.matches m
      where m.id = match_id and (auth.uid() = m.user_a or auth.uid() = m.user_b)
    )
  );

-- Feedback: participants only + only for their own submission
create policy "after_feedback_insert" on public.after_feedback
  for insert with check (
    exists (
      select 1 from public.matches m
      where m.id = match_id and (auth.uid() = m.user_a or auth.uid() = m.user_b)
    )
  );
