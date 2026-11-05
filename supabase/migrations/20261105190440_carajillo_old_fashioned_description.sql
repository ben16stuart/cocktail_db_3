-- Replace the sample description for Carajillo Old Fashioned with Ben's own.
do $$
begin
  update public.drinks
     set description = 'Perfect Old Fashioned riff. Use Tequila to stay on the Carajillo side. Use bourbon to lean to the Old Fashioned side. Use both to be an absolute savage.'
   where id = 181 and name = 'Carajillo Old Fashioned';
  if not found then
    raise exception 'Carajillo Old Fashioned (id 181) not found';
  end if;
end $$;
