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
        .select('amount, ingredient_id')
        .eq('drink_id', randomDrink.id);

      if (ingredientError) {
        console.error('Error fetching ingredients:', ingredientError);
        return res.status(500).json({ error: 'Failed to fetch ingredients' });
      }

      // Fetch ingredient names
      const ingredientIds = ingredientAmounts.map(item => item.ingredient_id);
      const { data: ingredients, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('id, name')
        .in('id', ingredientIds);

      if (ingredientsError) {
        console.error('Error fetching ingredient names:', ingredientsError);
        return res.status(500).json({ error: 'Failed to fetch ingredient names' });
      }

      // Map ingredient IDs to names
      const ingredientMap = ingredients.reduce((acc, item) => {
        acc[item.id] = item.name;
        return acc;
      }, {});

      // Prepare ingredients list with names
      const ingredientsWithNames = ingredientAmounts.map(item => ({
        name: ingredientMap[item.ingredient_id],
        amount: item.amount
      }));

      // Fetch instructions for the random drink
      const { data: instructions, error: instructionsError } = await supabase
        .from('instructions')
        .select('step_number, instruction')
        .eq('drink_id', randomDrink.id)
        .order('step_number', { ascending: true });

      if (instructionsError) {
        console.error('Error fetching instructions:', instructionsError);
        return res.status(500).json({ error: 'Failed to fetch instructions' });
      }

      // Combine drink, ingredients, and instructions
      const drinkWithDetails = {
        ...randomDrink,
        ingredients: ingredientsWithNames,
        instructions
      };

      return res.status(200).json(drinkWithDetails);
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
          .match({ 'ingredients.name': ingredient });

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
