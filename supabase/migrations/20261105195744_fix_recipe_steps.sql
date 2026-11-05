-- Recipe-step spelling and wording fixes from the 2026-11-05 review.
-- Each fix only applies if the step still holds exactly the reviewed text;
-- if any one doesn't match, the whole migration rolls back.
-- Not included: casual missing apostrophes, and the Pina Colada dark rum float (left for the user).

do $f$ begin
  update public.instructions set instruction = 'Rinse coupe (or rocks) glass with absinthe.'
   where drink_id = 32 and step_number = 1 and instruction = 'Rinse coupe (or rocks) glass with asbinthe.';
  if not found then raise exception 'step fix did not apply: drink 32 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Stir the rest of the ingredients with ice separately.'
   where drink_id = 32 and step_number = 2 and instruction = 'Stir the rest of the ingredients with ice seperatly.';
  if not found then raise exception 'step fix did not apply: drink 32 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Don''t disappoint Dave Arnold.'
   where drink_id = 90 and step_number = 1 and instruction = 'Don''t dissapoint Dave Arnold.';
  if not found then raise exception 'step fix did not apply: drink 90 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Fill your rocks glass up with exactly 5 oz of water and make a note of the wash line. Then empty.'
   where drink_id = 90 and step_number = 4 and instruction = 'Fill you rocks glass up with exactly 5 oz of water and make a note of the wash line. Then empty.';
  if not found then raise exception 'step fix did not apply: drink 90 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add frozen gin to your rocks glass.'
   where drink_id = 90 and step_number = 5 and instruction = 'Add frozen gin to you rocks glass.';
  if not found then raise exception 'step fix did not apply: drink 90 step 5'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add gin and tonic to an iSi cream whipper/soda stream(you can be less careful now).'
   where drink_id = 90 and step_number = 10 and instruction = 'Add gin and tonic to a iSi cream whipper/soda stream(you can be less careful now).';
  if not found then raise exception 'step fix did not apply: drink 90 step 10'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Squeeze in lime juice but then discard the lime instead of putting it in the drink.'
   where drink_id = 90 and step_number = 14 and instruction = 'Squeeze in lime juice but then discard the lime insteaad of putting it in the drink.';
  if not found then raise exception 'step fix did not apply: drink 90 step 14'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'First apologize for thinking I had only fancy drinks in here.'
   where drink_id = 85 and step_number = 1 and instruction = 'First apoligize for thinking I had only fancy drinks in here.';
  if not found then raise exception 'step fix did not apply: drink 85 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Fill a 2 oz shot glass with Amaretto (Must be a tall shot glass for this to work).'
   where drink_id = 85 and step_number = 2 and instruction = 'Fill a 2 oz shot glass with Ameretto (Must be a tall shot glass for this to work).';
  if not found then raise exception 'step fix did not apply: drink 85 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Place a rocks glass upside down on top of the shot glass.'
   where drink_id = 85 and step_number = 3 and instruction = 'Place a rocks glass upsidedown on top of the shot glass.';
  if not found then raise exception 'step fix did not apply: drink 85 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'If you''re making a 1/4 batch - Add all ingredients to a shaker with ice and pour over ice into a tiki/rocks glass'
   where drink_id = 180 and step_number = 1 and instruction = 'If you''re making a 1/4 bacth - Add all ingredients to a shaker with ice and pour over ice into a tiki/rocks glass';
  if not found then raise exception 'step fix did not apply: drink 180 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Garnish with something cool. Tiki umbrella, cherries, orange slices?'
   where drink_id = 180 and step_number = 3 and instruction = 'Garnish with something cool. Tiki umbrella, cherries, orance slices?';
  if not found then raise exception 'step fix did not apply: drink 180 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Stir all ingredients with ice'
   where drink_id = 152 and step_number = 1 and instruction = 'Stir all ingredints with ice';
  if not found then raise exception 'step fix did not apply: drink 152 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add all ingredients to a shaker with ice'
   where drink_id = 153 and step_number = 1 and instruction = 'Add all ingredints to a shaker with ice';
  if not found then raise exception 'step fix did not apply: drink 153 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is dissolved. (usually about 3 times)'
   where drink_id = 100005 and step_number = 3 and instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is disolved. (usually about 3 times)';
  if not found then raise exception 'step fix did not apply: drink 100005 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Heat for 30 seconds in a microwave or until its all dissolved.'
   where drink_id = 100008 and step_number = 2 and instruction = 'Heat for 30 seconds in a microwave or until its all disolved.';
  if not found then raise exception 'step fix did not apply: drink 100008 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is dissolved. (usually about 3 times).'
   where drink_id = 100011 and step_number = 2 and instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is disolved. (usually about 3 times).';
  if not found then raise exception 'step fix did not apply: drink 100011 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is dissolved. (usually about 3 times).'
   where drink_id = 100015 and step_number = 2 and instruction = 'Heat for 30 seconds. Remove. Quick stir. Repeat until sugar is disolved. (usually about 3 times).';
  if not found then raise exception 'step fix did not apply: drink 100015 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'You can muddle a jalapeño(s) with the cucumber instead of using infused tequila too.'
   where drink_id = 21 and step_number = 5 and instruction = 'You can muddle a jalepeno(s) with the cucumber instead of using infused tequila too.';
  if not found then raise exception 'step fix did not apply: drink 21 step 5'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Shake all ingredients with ice. (High proof bourbon is best!)'
   where drink_id = 40 and step_number = 1 and instruction = 'Shake all ingredients with ice. (High proof burbon is best!)';
  if not found then raise exception 'step fix did not apply: drink 40 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Stir lightly and let sit for 15-30 mins in the fridge.'
   where drink_id = 68 and step_number = 3 and instruction = 'Stir lighlty and let sit for 15-30 mins in the fridge.';
  if not found then raise exception 'step fix did not apply: drink 68 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Garnish with a lemon wedge.'
   where drink_id = 69 and step_number = 3 and instruction = 'Granish with a lemon wedge.';
  if not found then raise exception 'step fix did not apply: drink 69 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Choose the hot sauce you want. Tapatio, Sriracha, anything spicy.'
   where drink_id = 70 and step_number = 2 and instruction = 'Choose the hot sauce you want. Tapatio, Siracha, anything spicy.';
  if not found then raise exception 'step fix did not apply: drink 70 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Fine Strain over ice into a collins glass. No one wants to drink tiny mint pieces through a straw.'
   where drink_id = 119 and step_number = 2 and instruction = 'Fine Strain over ice into a collins glass. Noone wants to drink tiny mint pieces through a straw.';
  if not found then raise exception 'step fix did not apply: drink 119 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Garnish with whole blueberries and thyme because you''re a basic Instagram account.'
   where drink_id = 124 and step_number = 4 and instruction = 'Garnish with whole blueberries and thyme because you''re a basic insatagram account.';
  if not found then raise exception 'step fix did not apply: drink 124 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'My creme de menthe is non-alcoholic. If yours isn''t, do 1 oz of the hard stuff and omit the vodka.'
   where drink_id = 139 and step_number = 3 and instruction = 'My creme de menth is non-alcoholic. If yours isn''t. Do 1 oz of the hard stuff and omit the vodka.';
  if not found then raise exception 'step fix did not apply: drink 139 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Strain into prepared coupe.'
   where drink_id = 171 and step_number = 4 and instruction = 'Strain into perpared coupe.';
  if not found then raise exception 'step fix did not apply: drink 171 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Prepare a copper mug. Rim with crushed graham cracker crumbs if you want to be cool. We know you do.'
   where drink_id = 174 and step_number = 1 and instruction = 'Prepare a copper mug. Rim with crushed graham craker crumbs if you want to be cool. We know you do.';
  if not found then raise exception 'step fix did not apply: drink 174 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Let sit for 20-30 mins. You want the milk to curdle.'
   where drink_id = 100016 and step_number = 2 and instruction = 'Let sit for 20-30 mins. You want the milk to curddle.';
  if not found then raise exception 'step fix did not apply: drink 100016 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Combine with other ingredients and warm in a microwave until the sugar is dissolved.'
   where drink_id = 100016 and step_number = 6 and instruction = 'Combine with other ingredient and warm in a microwave until the sugar is dissolved.';
  if not found then raise exception 'step fix did not apply: drink 100016 step 6'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Split equal parts honey syrup and ginger syrup if you dont have honey ginger syrup.'
   where drink_id = 160 and step_number = 2 and instruction = 'Split equal parts honey syrup and ginger syrup of you dont have honey ginger syrup, ';
  if not found then raise exception 'step fix did not apply: drink 160 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'The grapefruit juice is supposed to be acid adjusted. So 4g of citric acid for every 100g of juice. But you''ll survive if it''s just juice.'
   where drink_id = 105 and step_number = 1 and instruction = 'The grapefruit juice is supposed to be acid adjusted. So 4g of citric acid for ever 100g of juice. But you''ll survive if it''s just juice.';
  if not found then raise exception 'step fix did not apply: drink 105 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Shake and strain into a rocks glass over an ice ball or big rock.'
   where drink_id = 105 and step_number = 3 and instruction = 'Shake and strain into a rocks glass over a ice ball or big rock.';
  if not found then raise exception 'step fix did not apply: drink 105 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Shake and strain into a rocks glass over an ice ball or big rock.'
   where drink_id = 103 and step_number = 3 and instruction = 'Shake and strain into a rocks glass over a ice ball or big rock.';
  if not found then raise exception 'step fix did not apply: drink 103 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Disregard step 3. Salt and alcohol are probably responsible for more deaths than anything else.'
   where drink_id = 175 and step_number = 4 and instruction = 'Disregard step 3. Salt and alcohol are probably responsible for more deaths that anything else.';
  if not found then raise exception 'step fix did not apply: drink 175 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Shake and strain over pebble ice into an old fashioned glass'
   where drink_id = 153 and step_number = 2 and instruction = 'Shake and strain over a pebble ice into an old fashioned glass';
  if not found then raise exception 'step fix did not apply: drink 153 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add the mint and gin and ice then shake and strain over pebble ice into an old fashioned glass'
   where drink_id = 155 and step_number = 2 and instruction = 'Add the mint and gin and ice then shake and strain over a pebble ice into an old fashioned glass';
  if not found then raise exception 'step fix did not apply: drink 155 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add a small scoop of pebble ice into the shaker, add Cachaca and give it a good shake. Stop when the ice is mostly gone, but not all the way.'
   where drink_id = 157 and step_number = 2 and instruction = 'Add a small scoop pebble ice into the shaker, add Cachaca and give it a good shake. Stop when the ice is mostly gone, but not all the way.';
  if not found then raise exception 'step fix did not apply: drink 157 step 2'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Garnish with something fancy if you want.'
   where drink_id = 142 and step_number = 3 and instruction = 'Garnish with a something fancy if you want.';
  if not found then raise exception 'step fix did not apply: drink 142 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Find frozen passionfruit puree cubes at Walmart or Whole Foods. Don''t bother with actual passionfruits.'
   where drink_id = 100002 and step_number = 1 and instruction = 'Find frozen passionfruit puree cubes at Walmart of Whole foods. Don''t bother with actual passionfruits.';
  if not found then raise exception 'step fix did not apply: drink 100002 step 1'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Bottle and store in the refrigerator. Lasts about a month or two for me.'
   where drink_id = 100002 and step_number = 4 and instruction = 'Bottle and store in the refrigerator Lasts about a month or two for me.';
  if not found then raise exception 'step fix did not apply: drink 100002 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Green grapes are the choice, #2 are any of the ones that say they taste like cotton candy or candy.'
   where drink_id = 133 and step_number = 4 and instruction = 'Green grapes are the choice, #2 are any of the ones that say that taste like cotton candy or candy.';
  if not found then raise exception 'step fix did not apply: drink 133 step 4'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'For each 100 grams of syrup, add 1/4 tsp of almond, rose and orange flower to it.'
   where drink_id = 100015 and step_number = 3 and instruction = 'For each 100 grams of syrup, add 1/4 tsp of almond rose and orange flower to it.';
  if not found then raise exception 'step fix did not apply: drink 100015 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Dirty dump (no straining) into a double old fashioned glass (a rocks glass can sometimes be a tiny bit too small. But I believe in you!)'
   where drink_id = 126 and step_number = 6 and instruction = 'Dirty dump (no straining) into a double old fashioned glass (a rocks glass can sometimes be a tiny bit too small. But I believe in you!';
  if not found then raise exception 'step fix did not apply: drink 126 step 6'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Enjoy!'
   where drink_id = 131 and step_number = 3 and instruction = 'Enjoy!.';
  if not found then raise exception 'step fix did not apply: drink 131 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Top with a good sparkling water. Topo Chico is the go-to. Anything better than your value brand seltzer in a can.'
   where drink_id = 178 and step_number = 3 and instruction = 'Top with a good sparkling water. Topo Chico is the goto. Anything better than your value brand seltzer in a can.';
  if not found then raise exception 'step fix did not apply: drink 178 step 3'; end if;
end $f$;

do $f$ begin
  update public.instructions set instruction = 'Add demerara syrup, bitters and whiskey to a rocks glass'
   where drink_id = 15 and step_number = 1 and instruction = 'Add simple syrup, bitters and whiskey to a rocks glass';
  if not found then raise exception 'step fix did not apply: drink 15 step 1'; end if;
end $f$;
