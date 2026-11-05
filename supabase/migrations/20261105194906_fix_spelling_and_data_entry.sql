-- Spelling and data-entry fixes from the 2026-11-05 review.
-- Every change only applies if the field still holds exactly the reviewed text;
-- if any one doesn't match, the whole migration rolls back.
-- Not included (left for the user): casual missing apostrophes, recipe steps,
-- Union Gin Fizz soda amount, Cointreau/Triple Sec, Soda/Sparkling Water, Hot Sauce type.

do $f$ begin
  update public.drinks set name = 'Daiquiri' where id = 19 and name = 'Daquiri';
  if not found then raise exception 'fix did not apply: drinks #19 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Cuba Cuba Daiquiri' where id = 126 and name = 'Cuba Cuba Daquiri';
  if not found then raise exception 'fix did not apply: drinks #126 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Nuclear Daiquiri 2.0' where id = 131 and name = 'Nuclear Daquiri 2.0';
  if not found then raise exception 'fix did not apply: drinks #131 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Nuclear Daiquiri' where id = 135 and name = 'Nuclear Daquiri';
  if not found then raise exception 'fix did not apply: drinks #135 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Floral Daiquiri' where id = 171 and name = 'Floral Daquiri';
  if not found then raise exception 'fix did not apply: drinks #171 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Bourbon Renewal' where id = 24 and name = 'Burbon Renewal';
  if not found then raise exception 'fix did not apply: drinks #24 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Hurricane' where id = 78 and name = 'Hurracaine';
  if not found then raise exception 'fix did not apply: drinks #78 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set name = 'Tequila Sherry Eggnog' where id = 96 and name = 'Tequila Shery Eggnog';
  if not found then raise exception 'fix did not apply: drinks #96 name'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set name = 'Demerara Syrup' where id = 100000 and name = 'Demarara Syrup';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100000 name'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set name = 'Amer Picon Substitute' where id = 100006 and name = 'Amer Picon Subsitute';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100006 name'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set name = 'Fake Lime Juice / Lime Acid' where id = 100003 and name = 'Fake Lime juice / Lime Acid';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100003 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Bourbon Whiskey' where id = 37 and name = 'Burbon Whiskey';
  if not found then raise exception 'fix did not apply: ingredients #37 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Yellow Chartreuse' where id = 96 and name = 'Yellow Chartruese';
  if not found then raise exception 'fix did not apply: ingredients #96 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Creme de Menthe' where id = 160 and name = 'Créme de Menth';
  if not found then raise exception 'fix did not apply: ingredients #160 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Creme de Menthe Syrup' where id = 163 and name = 'Créme de Menth Syrup';
  if not found then raise exception 'fix did not apply: ingredients #163 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Creme de Cacao' where id = 162 and name = 'Créme de Cacao';
  if not found then raise exception 'fix did not apply: ingredients #162 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'White Creme de Cacao' where id = 161 and name = 'White Créme de Cacao';
  if not found then raise exception 'fix did not apply: ingredients #161 name'; end if;
end $f$;

do $f$ begin
  update public.ingredients set name = 'Creme de Cassis' where id = 111 and name = 'Créme De Cassis';
  if not found then raise exception 'fix did not apply: ingredients #111 name'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Classic marg. Grand Marnier, Orange Curaçao or Triple Sec are interchangeable IMO.' where id = 20 and description = 'Classic marg. Grand Marnier, Orange Curascao or Triple Sec are interchangable IMO.';
  if not found then raise exception 'fix did not apply: drinks #20 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Jeffrey Morgenthaler Special...Its a whiskey sour with Creme de Cassis. (You could use any dark fruit liqueur) ' where id = 24 and description = 'Jeffery Morganthaller Special...Its a whiskey sour with Creme de Cassis. (You could use any dark fruit liqueur) ';
  if not found then raise exception 'fix did not apply: drinks #24 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Saved by Morgenthaler. This one rocks!' where id = 40 and description = 'Saved by Morganthaller. This one rocks!';
  if not found then raise exception 'fix did not apply: drinks #40 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Morgenthaler version. Much lighter than a regular one. I could go through a LOT of these on a patio.' where id = 70 and description = 'Morganthaller version. Much lighter than a regular one. I could go through a LOT of these on a patio.';
  if not found then raise exception 'fix did not apply: drinks #70 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'One of my favorites. If you like a daiquiri you''ll love this. If not, who TF are you?' where id = 42 and description = 'One of my favorites. If you like a daquiri you''ll love this. If not, who TF are you?';
  if not found then raise exception 'fix did not apply: drinks #42 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'It''s a gin daiquiri / gin sour, but regardless for something this good, it gets its own name.' where id = 149 and description = 'It''s a gin daquiri / gin sour, but regardless for something this good, it gets its own name.';
  if not found then raise exception 'fix did not apply: drinks #149 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'I''m team daiquiri and daiquiris came first but somehow team gimlet stole this one. Typical team gimlet. Just slightly different specs, but still just as delicious.' where id = 150 and description = 'I''m team daquiri and daquiris came first but somehow team gimlet stole this one. Typical team gimlet. Just slightly different specs, but still just as delicious.';
  if not found then raise exception 'fix did not apply: drinks #150 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'An absolutely AMAZING addition to the already perfect classic daiquiri, this usually calls for Green Chartreuse. Well I ain''t loaded enough to have a bottle, but this might be just as good. Actually I prefer it due to the lack of additional sweetness.' where id = 131 and description = 'An absolutely AMAZING addition to the already perfect classic daquiri, this usually calls for Green Chartreuse. Well I ain''t loaded enough to have a bottle, but this might be just as good. Actually I prefer it due to the lack of additional sweetness.';
  if not found then raise exception 'fix did not apply: drinks #131 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The daiquiri''s cousin. A little bitter. A little earthy. A lot awesome. I made sure to check with Cuba Cuba that I was using the right brand of cachaça. (Pirassununga 51). It''s worth it.' where id = 157 and description = 'The daquiri''s cousin. A little bitter. A little earthy. A lot awesome. I made sure to check with Cuba Cuba that I was using the right brand of cacacha. (Pirassununga 51). It''s worth it.';
  if not found then raise exception 'fix did not apply: drinks #157 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'This is SUPPOSED to be an equal parts drink(0.75 oz each). For someone you''re trying to get to like bourbon, this is a great gateway drink. But for all you disgusting addicts, these are my specs.' where id = 88 and description = 'This is SUPPOSED to be an equal parts drink(0.75 oz each). For someone you''re trying to get to like burbon, this is a great gateway drink. But for all you disgusting addicts, these are my specs.';
  if not found then raise exception 'fix did not apply: drinks #88 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Almost bourbon eggnog, but lighter and waaayyy better than anything from the store. A perfect dessert drink.' where id = 95 and description = 'Almost burbon eggnog, but lighter and waaayyy better than anything from the store. A perfect dessert drink.';
  if not found then raise exception 'fix did not apply: drinks #95 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Pretty damn close to my favorite drink of all time (At least top 5). I first had it at a bar in Baltimore and knew it was a masterpiece. This drink has spice to it. Its up to you how much and where it comes from.(Hot honey, spicy bourbon, muddled jalapeño.) I used a split base of bourbon and cayenne pepper pecan infused bourbon.' where id = 103 and description = 'Pretty damn close to my favorite drink of all time (At least top 5). I first had it at a bar in Baltimore and knew it was a masterpiece. This drink has spice to it. Its up to you how much and where it comes from.(Hot honey, spicy burbon, muddled jalepeno.) I used a a split base of burbon and cayenne pepper pecan infused burbon.';
  if not found then raise exception 'fix did not apply: drinks #103 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'If you''re here, chances are, you can make a perfectly boring gin & tonic. When your friends who pretend to like them head home, and your actual friends show up who expect greatness from you, try this.' where id = 90 and description = 'If you''re here, chances are, you can make a prefectly boring gin & tonic. When your friends who pretend to like them head home, and your actual friends show up who expect greatness from you, try this.';
  if not found then raise exception 'fix did not apply: drinks #90 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'One of the nicest things I can say about this drink is that there is nothing bad I can say about this drink! Which is honestly impressive thinking about some of the gawd awful drinks that I wasted perfectly good alcohol trying. It all works together to make a fantastic last word/whiskey sour riff.' where id = 145 and description = 'One of the nicest things I can say about this drink is that there is nothing bad I can say about this drink! Which is is honestly impressive thinking about some of the gawd awful drinks that I wasted prefectly good alcohol trying. It all works together to make a fantastic last word/whiskey sour riff.';
  if not found then raise exception 'fix did not apply: drinks #145 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Listen, if you want to ruin this perfectly good drink with a peaty scotch float, that''s your choice. ' where id = 160 and description = 'Listen, if you want to ruin this prefectly good drink with a peaty scotch float, that''s your choice. ';
  if not found then raise exception 'fix did not apply: drinks #160 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'No. It doesn''t taste like soap. Yes. You will own a bottle of créme de violette for the rest of your life.' where id = 65 and description = 'No. It doesen''t taste like soap. Yes. You will own a bottle of créme de violette fo the rest of your life.';
  if not found then raise exception 'fix did not apply: drinks #65 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Turn any beer into a shandy! Though I cannot be held responsible if your dumbass chooses a Guinness.' where id = 69 and description = 'Turn any beer into a shandy!. Though I cannot be held responsible if your dubmass chooses a guiness.';
  if not found then raise exception 'fix did not apply: drinks #69 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'More like a template than a true recipe. You choose the rum and choose wisely. Dark/Aged ones work great. It''s also equal parts which makes it easy to mix up more after you''ve had a couple. Also, please just make some good grenadine. It''s not that hard. Don''t use Rose''s.' where id = 128 and description = 'More like a template that a true recipe. You choose the rum and choose wisely. Dark/Aged ones work great. It''s also equal parts which makes it easy to mix up more after you''ve had a couple. Also, please just make some good grenadine. It''s not that hard. Don''t use Roses.';
  if not found then raise exception 'fix did not apply: drinks #128 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'As an avid negroni hater the likes of which would make Silky Johnson and Buc Nasty proud, this drink works.' where id = 107 and description = 'As an avid negroni hater the like of which would make Silky Johnson and Buc Nasty proud, this drinks works.';
  if not found then raise exception 'fix did not apply: drinks #107 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Perfect balance between a manhattan and an old fashioned. The choice of amaro is up to you. But choose wisely. Don''t make me be like the old knight in Indiana Jones.' where id = 84 and description = 'Perfect balance between a manhattan and a old fashioned. The choice of amaro is up to you. But choose wisely. Don''t make me be like the old knight in Indiana Jones.';
  if not found then raise exception 'fix did not apply: drinks #84 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Truly one of the only drinks that can compete with the Old Fashioned. For those times youre feeling just a little extra fancy.' where id = 74 and description = 'Truly one of the only drinks that can compete with the Old Fashioned. For those time youre feeling just a little extra fancy.';
  if not found then raise exception 'fix did not apply: drinks #74 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'This is so good it will make you believe in Santa again. These amounts make one drink. Scale up by all means. It only gets better if you leave it in the fridge overnight...or longer.' where id = 96 and description = 'This is so good it will make you believe in Santa again. These amounts make one drinks. Scale up by all means. It only gets better if you leave it in the fridge overnight...or longer.';
  if not found then raise exception 'fix did not apply: drinks #96 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The ultimate dessert drink. Stop drinking them once your wife tells you "You can''t keep saying ''young grasshoppa'' in an Asian accent. Its getting offensive."' where id = 139 and description = 'The ultimate dessert drink. Stop drinking them once your wife tells you "You can''t keep saying ''young grasshoppa'' in as asian accent. Its getting offensive."';
  if not found then raise exception 'fix did not apply: drinks #139 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The Japanese is a great cocktail that benefits from a nice cognac. This uses a $5.99 pint of cheap brandy. Use clear orgeat if possible.' where id = 101 and description = 'The Japanese is a great cocktail that benefits from a nice cognac. This uses a $5.99 pint of cheap brandy.Use clear orgeat if possible.';
  if not found then raise exception 'fix did not apply: drinks #101 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Everybody loves Arizona Mucho Mango. It''s impossible to prove otherwise. So make a killer marg with it! NOW! It''s only 99¢!' where id = 114 and description = 'Everybody loves Arizona Mucho Mango. It''s impossible to prove otherwise. So make a killer marg with it! NOW! It''s only ¢99!';
  if not found then raise exception 'fix did not apply: drinks #114 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Sadly, neither the restaurant nor my wife will support me trying to set a personal best for the number of these I drink in a sitting.' where id = 126 and description = 'Sadly, neither the resturant or my wife will support me trying to set a personal best for the number of these I drink in a sitting.';
  if not found then raise exception 'fix did not apply: drinks #126 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The whiskey mac sour was a solid (borderline great) drink from a sushi bar in Breckenridge. But for only $8 I knew it would be lacking in the whiskey department. But you know what is easy to do at home? Add some good f''n whiskey! The magic part is the Macadamia Nut Orgeat. Sure its a little work but worth it. Regular orgeat works great too.' where id = 130 and description = 'The whiskey mac sour was a solid (borderline great) drink from a sushi bar in Breckinridge. But for only $8 I knew it would be lacking in the whiskey department. But you know what is easy to do at home? Add some good f''n whiskey! The magic part is the Macadamia Nut Orgeat. Sure its a little work but worth it. Regular orgeat works great too.';
  if not found then raise exception 'fix did not apply: drinks #130 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Significantly better than a Negroni. Closer to an El Presidente. Zero complaints.' where id = 172 and description = 'Significantly better than a negroi. Closer to an El Presidente. Zero complaints.';
  if not found then raise exception 'fix did not apply: drinks #172 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Champagne and a liqueur. If you don''t have creme de cassis, don''t let that stop you from experimenting.' where id = 55 and description = 'Champagne and a liqueur. If you don''t have creme de cassis, don''t let that stop you from expirementing.';
  if not found then raise exception 'fix did not apply: drinks #55 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Perfect alternative if you don''t want to get yelled at for not cleaning the blender later that night. Recipe borrowed from Cuba Cuba.' where id = 56 and description = 'Perfect alternitive if you don''t want to get yelled at for not cleaning the blender later that night. Recipe borrowed from Cuba Cuba.';
  if not found then raise exception 'fix did not apply: drinks #56 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Nice smooth vodka drink. Leave out the egg white for a summery-er version.' where id = 83 and description = 'Nice smoothe vodka drink. Leave out the egg white for a summery-er version.';
  if not found then raise exception 'fix did not apply: drinks #83 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The easiest variation of the marg without going with some bottled crap. Also a damn good one. Thanks Tommy!' where id = 111 and description = 'The easiest variation of the marg without going with some botteled crap. Also a damn good one. Thanks Tommy!';
  if not found then raise exception 'fix did not apply: drinks #111 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The BEST non-rum tiki drink in existence. Rum ones included this is still top 5. I like mine with a little more passionfruit. This is also great blended but it needs double the orgeat for that.' where id = 115 and description = 'The BEST non-rum tiki drink in exsistence. Rum ones included this is still top 5. I like mine with a little more passionfruit. This is also great blended but it needs double the orgeat for that.';
  if not found then raise exception 'fix did not apply: drinks #115 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Some sangrias are horrible, bland, just wine with fruit. Yuck. Get yo shit together. Also not everybody loves your secret recipe, so just make these one off.' where id = 121 and description = 'Some sangrias are horible, bland, just wine with fruit. Yuck. Get yo shit together. Also not everybody loves your secret recipe, so just make these one off.';
  if not found then raise exception 'fix did not apply: drinks #121 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Truly a two ingredient drink(Scotch & Amaretto), but adding in something with a little extra character makes it stand out. i.e. rosemary simple, lavender, orange, chartreuse...Up to you. Also this drink is simple, even though you''re not supposed to garnish it, step up yo presentation!' where id = 142 and description = 'Truly a two ingredient drink(Scotch & Amaretto), but adding in something with a little extra character makes it stand out. i.e. rosmary simple, lavender, orange, chartreuse...Up to you. Also this drink is simple, even though you''re not supposed to garnish it, step up yo presentation!';
  if not found then raise exception 'fix did not apply: drinks #142 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Are you aware of the Theory of Relativity regarding relativity of simultaneity? Then first off, NEERRRRD! Secondly for the cool people out there, it''s about how there is no ''NOW'' and everybody''s perception of it is different and no one ever sees the same ''now''. Well this drink will never be perceived the same by anyone else, due to the choice of amaro and rum, but that''s the exciting part. This drink is fantastic and a flavor slap in the face!' where id = 153 and description = 'Are you aware of the Theory of Relativity regarding relativity of simultaneity? Then first off, NEERRRRD! Secondly for the cool people out there, it''s about how there is no ''NOW'' and everybody''s perception of it is different and no one ever sees the same ''now''. Well this drink will never be percieved the same by anyone else, due to the choice of amaro and rum, but that''s the exciting part. This drink is fantastic and a flavor slap in the face!';
  if not found then raise exception 'fix did not apply: drinks #153 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'If you can get a bottle of Chartreuse, this is the bomb!' where id = 135 and description = 'If you can get a bottle of chartruse, this is the bomb!';
  if not found then raise exception 'fix did not apply: drinks #135 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'A VERY good drink that calls for Amer Picon...which I don''t think you can buy in the US so use the substitute version from the homemade ingredients. You wont regret it.' where id = 116 and description = 'A VERY good drink that calls for Amer Picon...which i don''t think you can buy in the US so use the subsitute version from the homemade ingredients. You wont regret it.';
  if not found then raise exception 'fix did not apply: drinks #116 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'Every resort I''ve been to has their own recipe. Don''t risk Montezuma''s Revenge and make a great one at home.' where id = 122 and description = 'Every resort I''ve been to has their own recipe. Don''t risk Montezumas Revenge and make a great one at home.';
  if not found then raise exception 'fix did not apply: drinks #122 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'It took one of my favorite YouTube bartenders saying this was one of his favorite drinks ever to try this. More so it took my wife getting a huge thing of grapes and knowing my son would never eat that many. This drink just works.' where id = 133 and description = 'It took one of my favorite YouTube bartenders saying this was one of his favorite drinks ever to try this. Moreso it took my wife getting a huge thing of grapes and knowing my son would never eat that many. This drink just works.';
  if not found then raise exception 'fix did not apply: drinks #133 description'; end if;
end $f$;

do $f$ begin
  update public.drinks set description = 'The old fashioned''s fun crazy Mexican uncle!' where id = 48 and description = 'The old fashioned''s fun crazy mexican uncle!';
  if not found then raise exception 'fix did not apply: drinks #48 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = '2 to 1 Demerara syrup. Demerara sugar is expensive. Use a split of white and light brown sugar to get about the same. Or go buy demerara sugar for $8 a bag at Whole Foods.' where id = 100000 and description = '2 to 1 Demarara syrup. Demarara sugar is expensive. Use a split of white and light brown sugar to get about the same. Or go buy demarara sugar for $8 a bag at Whole Foods.';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100000 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = 'Really cool alternative to lime juice that doesnt go bad. You might notice the taste difference in a daiquiri, but not in a margarita (other than the appearance). This is about a 6% solution.' where id = 100003 and description = 'Really cool alternitive to lime juice that doesnt go bad. You might notice the taste difference in a daquiri, but not in a margarita (other than the appearence). This is about a 6% solution.';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100003 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = 'You can''t buy Picon in the US. Here is an attempted recreation of it. If youre wanting to make a Brooklyn cocktail (you should), you can use a baby formula or medicine syringe to get the 0.25 oz with 3 ml Amaro, 3 ml Suze, 1.25 ml orange liqueur, and 1 ml orange bitters. Angostura orange is preferred.' where id = 100006 and description = 'You can''t buy Picon in the US. Here is a attempted recreation of it. If youre wanting to male a Brooklyn cocktail (you should), you can use a baby formula or medicine syringe to get the 0.25 oz with 3 ml Amaro, 3 ml Suze, 1.25 ml orange liqueur, and 1 ml orange bitters. Angostura orange is prefered.';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100006 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = 'Great addition to make any drink perfect for fall. Buy pure ginger juice from Amazon. Way easier than buying a bunch of roots and destroying your juicer that you said you''d use all the time but never do.' where id = 100011 and description = 'Great addition to make any drink perfect for fall. Buy pure ginger juice from Amazon. Way easier than buying a bunch of roots and destroying you juicer that you said you''d use all the time but never do.';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100011 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = '6% - A cool substitute for lime juice that stores forever and can be "close enough".' where id = 100018 and description = '6% - A cool subsitute for lime juice that stores forever and can be "close enough".';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100018 description'; end if;
end $f$;

do $f$ begin
  update public.homemade_ingredients set description = '6% - A cool substitute for lemon juice that stores forever and can be "close enough".' where id = 100019 and description = '6% - A cool subsitute for lime juice that stores forever and can be "close enough".';
  if not found then raise exception 'fix did not apply: homemade_ingredients #100019 description'; end if;
end $f$;

do $f$ begin
  update public.ingredients set ingredient_type = 'Juice', i_t_id = 2 where id = 174 and name = 'Key Lime Juice' and ingredient_type is null;
  if not found then raise exception 'fix did not apply: type for Key Lime Juice'; end if;
end $f$;

do $f$ begin
  update public.ingredients set ingredient_type = 'Syrup', i_t_id = 4 where id = 175 and name = 'Vanilla Syrup' and ingredient_type is null;
  if not found then raise exception 'fix did not apply: type for Vanilla Syrup'; end if;
end $f$;

do $f$ begin
  update public.ingredients set ingredient_type = 'Ingredient - Salt', i_t_id = 6 where id = 176 and name = 'Smoked Salt' and ingredient_type is null;
  if not found then raise exception 'fix did not apply: type for Smoked Salt'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '0.75 oz' where drink_id = 175 and ingredient_id = 6 and amount = '0.75';
  if not found then raise exception 'fix did not apply: amount 175/6'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '0.75 oz' where drink_id = 174 and ingredient_id = 174 and amount = '0.75';
  if not found then raise exception 'fix did not apply: amount 174/174'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '0.75 oz' where drink_id = 105 and ingredient_id = 64 and amount = '.75 oz';
  if not found then raise exception 'fix did not apply: amount 105/64'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1 dash' where drink_id = 121 and ingredient_id = 110 and amount = '1 dashes';
  if not found then raise exception 'fix did not apply: amount 121/110'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1 dash' where drink_id = 141 and ingredient_id = 58 and amount = '1 dashes';
  if not found then raise exception 'fix did not apply: amount 141/58'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1 dash' where drink_id = 145 and ingredient_id = 110 and amount = '1 dashes';
  if not found then raise exception 'fix did not apply: amount 145/110'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2 parts' where drink_id = 100006 and ingredient_id = 112 and amount = '1 part';
  if not found then raise exception 'fix did not apply: amount 100006/112'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1-1/2 cups' where drink_id = 100005 and ingredient_id = 5 and amount = '1-1/2 cup';
  if not found then raise exception 'fix did not apply: amount 100005/5'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '3x weight' where drink_id = 100008 and ingredient_id = 144 and amount = '3x Weight';
  if not found then raise exception 'fix did not apply: amount 100008/144'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1x weight' where drink_id = 100008 and ingredient_id = 32 and amount = '1x Weight';
  if not found then raise exception 'fix did not apply: amount 100008/32'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1x weight' where drink_id = 100011 and ingredient_id = 145 and amount = '1x Weight';
  if not found then raise exception 'fix did not apply: amount 100011/145'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1x weight' where drink_id = 100011 and ingredient_id = 133 and amount = '1x Weight';
  if not found then raise exception 'fix did not apply: amount 100011/133'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1x weight' where drink_id = 100015 and ingredient_id = 147 and amount = '1x Weight';
  if not found then raise exception 'fix did not apply: amount 100015/147'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2x weight' where drink_id = 100015 and ingredient_id = 133 and amount = '2x Weight';
  if not found then raise exception 'fix did not apply: amount 100015/133'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '1 oz' where drink_id = 161 and ingredient_id = 100 and amount = '1.0 oz';
  if not found then raise exception 'fix did not apply: amount 161/100'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2 oz' where drink_id = 162 and ingredient_id = 14 and amount = '2.0 oz';
  if not found then raise exception 'fix did not apply: amount 162/14'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2 oz' where drink_id = 180 and ingredient_id = 6 and amount = '2.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/6'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '4 oz' where drink_id = 180 and ingredient_id = 51 and amount = '4.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/51'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2 oz' where drink_id = 180 and ingredient_id = 8 and amount = '2.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/8'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '2 oz' where drink_id = 180 and ingredient_id = 70 and amount = '2.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/70'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '4 oz' where drink_id = 180 and ingredient_id = 14 and amount = '4.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/14'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set amount = '4 oz' where drink_id = 180 and ingredient_id = 10 and amount = '4.0 oz';
  if not found then raise exception 'fix did not apply: amount 180/10'; end if;
end $f$;

do $f$ begin
  update public.ingredient_amounts set ingredient_id = 153, amount = '1/4' where drink_id = 90 and ingredient_id = 6 and amount = '1/4 lime';
  if not found then raise exception 'fix did not apply: Gin & Tonic lime'; end if;
end $f$;

do $f$ begin
  delete from public.ingredients where id = 109 and name = 'Mint' and not exists (select 1 from public.ingredient_amounts where ingredient_id = 109);
  if not found then raise exception 'fix did not apply: delete unused Mint'; end if;
end $f$;

do $f$ begin
  delete from public.ingredients where id = 56 and name = 'Vanilla' and not exists (select 1 from public.ingredient_amounts where ingredient_id = 56);
  if not found then raise exception 'fix did not apply: delete unused Vanilla'; end if;
end $f$;

do $f$ begin
  delete from public.ingredients where id = 30 and name = 'Cold Brew' and not exists (select 1 from public.ingredient_amounts where ingredient_id = 30);
  if not found then raise exception 'fix did not apply: delete unused Cold Brew'; end if;
end $f$;

do $f$
declare n_amt int; n_ins int;
begin
  if exists (select 1 from public.drinks where id in (147, 151))
     or exists (select 1 from public.homemade_ingredients where id in (147, 151)) then
    raise exception 'drink 147 or 151 exists again; not deleting its rows';
  end if;
  delete from public.ingredient_amounts where drink_id in (147, 151);
  get diagnostics n_amt = row_count;
  delete from public.instructions where drink_id in (147, 151);
  get diagnostics n_ins = row_count;
  if n_amt <> 6 or n_ins <> 4 then
    raise exception 'orphan cleanup expected 6 amounts / 4 steps, got % / %', n_amt, n_ins;
  end if;
end $f$;
