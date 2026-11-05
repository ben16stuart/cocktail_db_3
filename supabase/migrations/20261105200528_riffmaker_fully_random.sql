-- RiffMaker (create_a_drink): fully random, independent picks.
--
-- Replaces 20261105200307, which stopped duplicates by never picking an
-- ingredient already in the drink. Ben prefers full randomness, so duplicates
-- are allowed again. Now each ingredient:
--   1. rolls once against the danger level (p_percent), and
--   2. if it swaps, takes an ingredient picked uniformly at random from every
--      ingredient of the same type except itself, independently of the others.
--
-- Two fixes from the original version are kept:
--   * A swap can't pick the ingredient's own name. The original matched by row
--     position, so ingredients sometimes "swapped" to themselves and stayed put
--     even at 100% danger.
--   * The roll uses floor(random() * 100). The original
--     substring(random()::text, 8, 2)::int could fail on short random values.
-- The output columns and their order are unchanged, so the site needs no change.

create or replace function public.create_a_drink(p_percent numeric, p_drink_id integer default null)
returns table (name text, amount text, old_ingredient text, ingredients text)
language plpgsql
set search_path = public
as $$
begin
  return query
  with selected_drink as (
    select d.id as drink_id, d.name::text as drink_name
    from drinks d
    where d.id = coalesce(p_drink_id, (select d2.id from drinks d2 order by random() limit 1))
  ),
  current_ings as materialized (
    select sd.drink_name,
           case
             when ia.amount not like '%oz' and ia.amount not like '%dash%' then 'Up to you'
             else ia.amount
           end::text as amount_text,
           i.id as ingredient_id,
           i.name::text as old_name,
           i.ingredient_type,
           i.i_t_id,
           floor(random() * 100) < p_percent as wants_swap
    from selected_drink sd
    join ingredient_amounts ia on ia.drink_id = sd.drink_id
    join ingredients i on i.id = ia.ingredient_id
  )
  select ci.drink_name,
         ci.amount_text,
         ci.old_name,
         coalesce(pick.new_name, ci.old_name)
  from current_ings ci
  left join lateral (
    -- re-run for every ingredient, so each pick is independent
    select c.name::text as new_name
    from ingredients c
    where ci.wants_swap
      and c.ingredient_type = ci.ingredient_type
      and c.id <> ci.ingredient_id
    order by random()
    limit 1
  ) pick on true
  order by ci.i_t_id, ci.old_name;
end;
$$;
