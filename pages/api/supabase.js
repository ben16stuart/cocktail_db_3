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

      if (!allDrinks || allDrinks.length === 0) {
        console.log('No drinks found');
        return res.status(404).json({ error: 'No drinks found' });
      }

      // Select a random drink
      const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
      console.log('Selected random drink:', randomDrink);

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
      const drinkWithIngredients = { ...randomDrink, ingredients: ingredientAmounts || [] };
      console.log('Returning drink with ingredients:', drinkWithIngredients);

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
          .eq('ingredients.text', ingredient);

        if (ingredientError) {
          console.error('Error fetching ingredient matches:', ingredientError);
          return res.status(500).json({ error: 'Failed to fetch ingredient matches' });
        }

        const drinkIds = ingredientResults ? ingredientResults.map(item => item.drink_id) : [];

        searchQuery = searchQuery.in('id', drinkIds);
      }

      const { data, error: searchError } = await searchQuery;

      if (searchError) {
        console.error('Error searching drinks:', searchError);
        return res.status(500).json({ error: 'Failed to search drinks' });
      }

      console.log('Search result data:', data);
      return res.status(200).json(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
