const supabase = supabase_py.createClient(
    'https://your-supabase-instance.supabase.co',
    'your-supabase-key'
  );
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const recipesContainer = document.getElementById('recipes-container');
  
  searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, name, ingredients, instructions')
        .eq('name', searchTerm);
      if (data) {
        const recipesHtml = data.map((recipe) => {
          return `
            <div class="recipe">
              <h2>${recipe.name}</h2>
              <p>Ingredients: ${recipe.ingredients}</p>
              <p>Instructions: ${recipe.instructions}</p>
            </div>
          `;
        }).join('');
        recipesContainer.innerHTML = recipesHtml;
      } else {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
      }
    }
  });