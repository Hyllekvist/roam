-- Example cleanup: delete expired matches and related data
-- Use Supabase scheduled jobs (cron) to call this function.
create or replace function public.cleanup_expired() returns void language plpgsql as $$
begin
  delete from public.matches where expires_at < now();
end;$$;
