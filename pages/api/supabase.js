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

      // Fetch ingredients for the random drink
      const { data: ingredientAmounts, error: ingredientError } = await supabase
        .from('ingredient_amounts')
        .select('amount, ingredients(text)')
        .eq('drink_id', randomDrink.id);

      if (ingredientError) {
        console.error('Error fetching ingredients:', ingredientError);
        return res.status(500).json({ error: 'Failed to fetch ingredients' });
      }

      // Combine drink and ingredients
      const drinkWithIngredients = { ...randomDrink, ingredients: ingredientAmounts };

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
        searchQuery = searchQuery.or(`name.ilike.%${query}%`);
      }

      if (ingredient) {
        searchQuery = searchQuery
          .join('ingredient_amounts', 'drinks.id', 'ingredient_amounts.drink_id')
          .join('ingredients', 'ingredient_amounts.ingredient_id', 'ingredients.id')
          .or(`ingredients.text.ilike.%${ingredient}%`);
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
