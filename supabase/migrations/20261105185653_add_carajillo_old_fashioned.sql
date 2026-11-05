-- Add "Carajillo Old Fashioned" (recipe from @highproofpreacher on Instagram).

-- Stop if it's already in the database.
do $$
begin
  if exists (select 1 from public.drinks where lower(name) = lower('Carajillo Old Fashioned')) then
    raise exception 'Carajillo Old Fashioned already exists';
  end if;
end $$;

-- "Kahlua" is a brand name and no drink uses it yet. Rename it to the generic
-- "Coffee Liqueur" so any coffee or espresso liqueur maps to one ingredient.
update public.ingredients set name = 'Coffee Liqueur' where id = 68 and name = 'Kahlua';

-- Keep the id sequences ahead of existing rows so the inserts can't collide.
select setval('public.ingredient_id_seq',
  greatest((select max(id) from public.ingredients), (select last_value from public.ingredient_id_seq)));
select setval('public.drinks_id_seq',
  greatest((select max(id) from public.drinks), (select last_value from public.drinks_id_seq)));

-- Cacao bitters have no existing match (Créme de Cacao is a liqueur, not bitters).
insert into public.ingredients (name, ingredient_type, i_t_id)
values ('Chocolate Bitters', 'Bitters', 5);

with new_drink as (
  insert into public.drinks (name, description, category, image_url, date_added)
  values (
    'Carajillo Old Fashioned',
    'A Carajillo dressed up as an Old Fashioned. Reposado and Licor 43 carry it, and the coffee liqueur and chocolate bitters push it into boozy vanilla mocha territory. Sneaky strong for something that tastes like dessert. Recipe borrowed from @highproofpreacher.',
    null, null, date '2026-11-05')
  returning id
),
amounts as (
  insert into public.ingredient_amounts (drink_id, ingredient_id, amount)
  select new_drink.id, i.id, v.amount
  from new_drink
  cross join (values
    ('Reposado Tequila',  '1.5 oz'),
    ('Licor 43',          '0.5 oz'),
    ('Coffee Liqueur',    '0.25 oz'),
    ('Orange Bitters',    '4 dashes'),
    ('Chocolate Bitters', '4 dashes')
  ) as v(name, amount)
  join public.ingredients i on i.name = v.name
  returning 1
),
steps as (
  insert into public.instructions (drink_id, step_number, instruction)
  select new_drink.id, s.step, s.instruction
  from new_drink
  cross join (values
    (1, 'Stir all ingredients in a mixing glass with ice until well chilled.'),
    (2, 'Strain into a rocks glass over a large cube.'),
    (3, 'Express an orange peel over the top and drop it in. The orange oil matters here.')
  ) as s(step, instruction)
  returning 1
)
select (select count(*) from amounts) as ingredients_added, (select count(*) from steps) as steps_added;

-- Roll everything back unless the drink came out complete.
do $$
declare d int; n_amt int; n_ins int;
begin
  select id into d from public.drinks where name = 'Carajillo Old Fashioned';
  select count(*) into n_amt from public.ingredient_amounts where drink_id = d;
  select count(*) into n_ins from public.instructions where drink_id = d;
  if n_amt <> 5 or n_ins <> 3 then
    raise exception 'Carajillo Old Fashioned incomplete: % ingredients, % steps', n_amt, n_ins;
  end if;
end $$;
