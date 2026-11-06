-- Add "50/50 Gin Martini": equal parts gin and Cocchi Americano.

do $$
begin
  if exists (select 1 from public.drinks where lower(name) = lower('50/50 Gin Martini')) then
    raise exception '50/50 Gin Martini already exists';
  end if;
end $$;

select setval('public.drinks_id_seq',
  greatest((select max(id) from public.drinks), (select last_value from public.drinks_id_seq)));

with new_drink as (
  insert into public.drinks (name, description, category, image_url, date_added)
  values (
    '50/50 Gin Martini',
    'I don''t always love a martini, but a freezing cold one of these hits the spot when you''re looking for something spirit forward',
    null, null, date '2026-11-05')
  returning id
),
amounts as (
  insert into public.ingredient_amounts (drink_id, ingredient_id, amount)
  select new_drink.id, i.id, v.amount
  from new_drink
  cross join (values
    ('Gin',              '1.5 oz'),
    ('Cocchi Americano', '1.5 oz')
  ) as v(name, amount)
  join public.ingredients i on i.name = v.name
  returning 1
),
steps as (
  insert into public.instructions (drink_id, step_number, instruction)
  select new_drink.id, s.step, s.instruction
  from new_drink
  cross join (values
    (1, 'Stir gin and Cocchi Americano in a mixing glass with ice until freezing cold.'),
    (2, 'Strain into a chilled martini or coupe glass.'),
    (3, 'Garnish with a lemon twist.')
  ) as s(step, instruction)
  returning 1
)
select (select count(*) from amounts) as ingredients_added, (select count(*) from steps) as steps_added;

-- Roll everything back unless the drink came out complete.
do $$
declare d int; n_amt int; n_ins int;
begin
  select id into d from public.drinks where name = '50/50 Gin Martini';
  select count(*) into n_amt from public.ingredient_amounts where drink_id = d;
  select count(*) into n_ins from public.instructions where drink_id = d;
  if n_amt <> 2 or n_ins <> 3 then
    raise exception '50/50 Gin Martini incomplete: % ingredients, % steps', n_amt, n_ins;
  end if;
end $$;
