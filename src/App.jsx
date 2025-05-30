import React, { useState, useEffect, useCallback } from 'react';
import RecipesPage from './components/RecipesPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import { fetchData } from './utils/fetchData';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

function App() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipesCurrentPage, setRecipesCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const categoriesData = await fetchData(`${API_BASE_URL}list.php?c=list`);
        setAllCategories(categoriesData.meals ? categoriesData.meals.map(c => c.strCategory).sort() : []);

        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const recipePromises = letters.map(letter =>
          fetchData(`${API_BASE_URL}search.php?f=${letter}`).then(data => data.meals || [])
        );
        const allRecipeArrays = await Promise.all(recipePromises);
        const fetchedRecipes = [].concat(...allRecipeArrays);
        setAllRecipes(fetchedRecipes);

        const tagSet = new Set();
        fetchedRecipes.forEach(recipe => {
          if (recipe.strTags) {
            recipe.strTags.split(',').forEach(tag => {
              const trimmedTag = tag.trim();
              if (trimmedTag) tagSet.add(trimmedTag);
            });
          }
        });
        setAllTags(Array.from(tagSet).sort());
      } catch (err) {
        setError(err.message || 'An unknown error occurred during initial data load.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleViewRecipe = useCallback((recipeId) => {
    setSelectedRecipeId(recipeId);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedRecipeId(null);
    setCurrentView('list');
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div>
          <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
            <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading delicious recipes...</p>
          <p>This might take a moment as we gather everything.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="error-box">
          <h2>Oops! Something went wrong.</h2>
          <p>We couldn't load the recipe data.</p>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return currentView === 'list' ? (
    <RecipesPage
      allRecipes={allRecipes}
      allCategories={allCategories}
      allTags={allTags}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
      recipesCurrentPage={recipesCurrentPage}
      setRecipesCurrentPage={setRecipesCurrentPage}
      onViewRecipe={handleViewRecipe}
    />
  ) : (
    <RecipeDetailPage recipeId={selectedRecipeId} onBack={handleBackToList} />
  );
}

export default App;