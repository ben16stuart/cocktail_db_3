-- RiffMaker (create_a_drink): never list the same ingredient twice.
--
-- The old version matched each ingredient to a replacement by row position
-- inside its ingredient type. Replacements could be:
--   * another ingredient already in the drink (two Angostura Bitters),
--   * the same replacement for two ingredients, or
--   * the ingredient's own name (so it stayed put even at 100% danger).
-- Its random roll, substring(random()::text, 8, 2)::int, could also fail when
-- random() printed fewer than 9 characters.
--
-- Now: each ingredient rolls once. Every ingredient that gets swapped takes a
-- different random ingredient of the same type that isn't already in the drink.
-- If a type runs out of candidates, the ingredient stays as it is.
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
  ),
  swaps as materialized (
    select ci.ingredient_id,
           ci.ingredient_type,
           row_number() over (partition by ci.ingredient_type order by random()) as slot
    from current_ings ci
    where ci.wants_swap and ci.ingredient_type is not null
  ),
  candidates as materialized (
    select i.name::text as new_name,
           i.ingredient_type,
           row_number() over (partition by i.ingredient_type order by random()) as slot
    from ingredients i
    where i.ingredient_type in (select s.ingredient_type from swaps s)
      and i.id not in (select ci.ingredient_id from current_ings ci)
  )
  select ci.drink_name,
         ci.amount_text,
         ci.old_name,
         coalesce(c.new_name, ci.old_name)
  from current_ings ci
  left join swaps s on s.ingredient_id = ci.ingredient_id
  left join candidates c on c.ingredient_type = s.ingredient_type and c.slot = s.slot
  order by ci.i_t_id, ci.old_name;
end;
$$;
