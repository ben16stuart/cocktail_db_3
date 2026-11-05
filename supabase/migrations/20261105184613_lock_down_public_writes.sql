-- Lock down writes from the public (anon) key.
--
-- The site only reads. All content edits are made as the postgres role
-- (SQL editor, Supabase CLI, Claude), which none of this affects.
--
-- The hole: the *_v views ran with their owner's rights (postgres), so the
-- read-only RLS policies on the tables were skipped. Anyone holding the anon
-- key could insert, edit or delete drinks through drinks_v and the other views.

-- 1. Views run with the caller's rights, so each table's RLS applies.
alter view public.drinks_v             set (security_invoker = true);
alter view public.ingredients_v        set (security_invoker = true);
alter view public.ingredient_amounts_v set (security_invoker = true);
alter view public.instructions_v       set (security_invoker = true);
alter view public.cheers_v             set (security_invoker = true);

-- 2. Public roles can only read content. This covers TRUNCATE too, which RLS
--    does not stop.
revoke insert, update, delete, truncate, references, trigger on
  public.drinks,
  public.ingredients,
  public.ingredient_amounts,
  public.instructions,
  public.homemade_ingredients,
  public.cheers,
  public.drinks_v,
  public.ingredients_v,
  public.ingredient_amounts_v,
  public.instructions_v,
  public.cheers_v
from anon, authenticated;

revoke all on all sequences in schema public from anon, authenticated;

-- 3. keep_alive is the one thing the public key may write: the timestamp on
--    row 1. It's used by the GitHub Action and the Vercel cron.
revoke all on public.keep_alive from anon, authenticated;
grant select, update (last_ping) on public.keep_alive to anon, authenticated;

alter table public.keep_alive enable row level security;

create policy "keep_alive read" on public.keep_alive
  for select to anon, authenticated using (true);

create policy "keep_alive ping" on public.keep_alive
  for update to anon, authenticated using (id = 1) with check (id = 1);

-- 4. Tables and sequences created later start read-only for the public roles
--    instead of read-write. Grant writes explicitly if a feature ever needs them.
alter default privileges for role postgres in schema public
  revoke insert, update, delete, truncate, references, trigger on tables from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke usage, update on sequences from anon, authenticated;
