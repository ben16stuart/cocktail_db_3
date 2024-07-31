import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  console.log('API Route Handler Invoked'); // Debugging log

  if (req.method === 'GET') {
    try {
      console.log('Fetching all drinks...');
      const { data: allDrinks, error: fetchError } = await supabase
        .from('drinks')
        .select('*');

      if (fetchError) {
        console.error('Error fetching drinks:', fetchError);
        return res.status(500).json({ error: 'Failed to fetch drinks' });
      }

      if (allDrinks.length === 0) {
        return res.status(404).json({ error: 'No drinks found' });
      }

      // Select a random drink
      const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
      console.log('Selected random drink:', randomDrink);

      // Fetch ingredient amounts for the random drink
      const { data: ingredientAmounts, error: ingredientAmountError } = await supabase
        .from('ingredient_amounts')
        .select('amount, ingredient_id')
        .eq('drink_id', randomDrink.id);

      if (ingredientAmountError) {
        console.error('Error fetching ingredient amounts:', ingredientAmountError);
        return res.status(500).json({ error: 'Failed to fetch ingredient amounts' });
      }

      console.log('Fetched ingredient amounts:', ingredientAmounts);

      // Fetch ingredients for the ingredient IDs obtained
      const ingredientIds = ingredientAmounts.map(ia => ia.ingredient_id);
      if (ingredientIds.length === 0) {
        console.log('No ingredients found for the drink.');
        return res.status(200).json({
          ...randomDrink,
          ingredients: []  // Return empty ingredients array if no ingredient IDs
        });
      }

      const { data: ingredients, error: ingredientError } = await supabase
        .from('ingredients')
        .select('id, name')
        .in('id', ingredientIds);

      if (ingredientError) {
        console.error('Error fetching ingredients:', ingredientError);
        return res.status(500).json({ error: 'Failed to fetch ingredients' });
      }

      console.log('Fetched ingredients:', ingredients);

      // Map ingredient IDs to names
      const ingredientMap = ingredients.reduce((map, ingredient) => {
        map[ingredient.id] = ingredient.name;
        return map;
      }, {});

      // Combine ingredient amounts with names
      const drinkWithIngredients = {
        ...randomDrink,
        ingredients: ingredientAmounts.map(ia => ({
          amount: ia.amount,
          name: ingredientMap[ia.ingredient_id] || 'Unknown ingredient'
        }))
      };

      console.log('Combined drink with ingredients:', drinkWithIngredients);

      return res.status(200).json(drinkWithIngredients);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { query, ingredient } = req.body;
      let searchQuery = supabase.from('drinks').select('*');

      if (query) {
        searchQuery = searchQuery.ilike('name', `%${query}%`);
      }

      if (ingredient) {
        // Query for ingredients separately and join results in the frontend
        const { data: ingredientResults, error: ingredientError } = await supabase
          .from('ingredient_amounts')
          .select('drink_id')
          .match({ 'ingredient_id': ingredient });

        if (ingredientError) {
          console.error('Error fetching ingredients:', ingredientError);
          return res.status(500).json({ error: 'Failed to fetch ingredients' });
        }

        const drinkIds = ingredientResults.map(item => item.drink_id);

        searchQuery = searchQuery.in('id', drinkIds);
      }

      const { data, error } = await searchQuery;

      if (error) {
        console.error('Error searching drinks:', error);
        return res.status(500).json({ error: 'Failed to search drinks' });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
