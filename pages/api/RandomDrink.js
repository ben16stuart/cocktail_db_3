import { supabase } from '../../utils/supabaseClient';
export default async function handler(req, res) {
 if (req.method !== 'GET') {
   return res.status(405).json({ error: 'Method not allowed' });
 }
 try {
   const { data: allDrinks, error: fetchError } = await supabase
     .from('drinks_v')
     .select('*');
   if (fetchError) {
     throw fetchError;
   }
   if (allDrinks.length === 0) {
     return res.status(404).json({ error: 'No drinks found' });
   }
   const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
   const { data: ingredientAmounts, error: ingredientError } = await supabase
     .from('ingredient_amounts_v')
     .select('amount, ingredient_id')
     .eq('drink_id', randomDrink.id);
   if (ingredientError) {
     throw ingredientError;
   }
   const ingredientIds = ingredientAmounts.map(item => item.ingredient_id);
   const { data: ingredients, error: ingredientsError } = await supabase
     .from('ingredients_v')
     .select('id, name, i_t_id')
     .in('id', ingredientIds)
     .order('i_t_id', { ascending: true });
   if (ingredientsError) {
     throw ingredientsError;
   }

   // Store both name and i_t_id in the map
   const ingredientMap = ingredients.reduce((acc, item) => {
     acc[item.id] = { name: item.name, i_t_id: item.i_t_id };
     return acc;
   }, {});

   // Use the ingredients array directly to maintain the sorted order
   const ingredientsWithNames = ingredients.map(ing => {
     const amountObj = ingredientAmounts.find(item => item.ingredient_id === ing.id);
     return {
       name: ing.name,
       amount: amountObj ? amountObj.amount : '',
       i_t_id: ing.i_t_id
     };
   }).sort((a, b) => (a.i_t_id || 0) - (b.i_t_id || 0));

   // Remove i_t_id before sending to frontend
   const finalIngredientsWithNames = ingredientsWithNames.map(({ name, amount }) => ({
     name,
     amount
   }));

   const { data: instructions, error: instructionsError } = await supabase
     .from('instructions_v')
     .select('step_number, instruction')
     .eq('drink_id', randomDrink.id)
     .order('step_number', { ascending: true });
   if (instructionsError) {
     throw instructionsError;
   }
   const drinkWithDetails = {
     ...randomDrink,
     ingredients: finalIngredientsWithNames,
     instructions
   };
   return res.status(200).json(drinkWithDetails);
 } catch (error) {
   console.error('Error fetching random drink:', error);
   return res.status(500).json({ error: 'Unexpected error occurred' });
 }
}
