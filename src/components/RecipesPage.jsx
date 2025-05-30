import React, { useMemo, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import FilterControls from './FilterControls';
import PaginationControls from './PaginationControls';

const RECIPES_PER_PAGE = 6;

function RecipesPage({
  allRecipes,
  allCategories,
  allTags,
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  recipesCurrentPage,
  setRecipesCurrentPage,
  onViewRecipe
}) {
  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(recipe.strCategory);
      const recipeTags = recipe.strTags ? recipe.strTags.split(',').map(t => t.trim()).filter(t => t) : [];
      const tagMatch = selectedTags.length === 0 || selectedTags.every(selTag => recipeTags.includes(selTag));
      return categoryMatch && tagMatch;
    });
  }, [allRecipes, selectedCategories, selectedTags]);

  useEffect(() => {
    setRecipesCurrentPage(1);
  }, [selectedCategories, selectedTags, setRecipesCurrentPage]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (recipesCurrentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const recipesToDisplay = filteredRecipes.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Recipe Browser</h1>
      <FilterControls
        categories={allCategories}
        tags={allTags}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategories}
        onTagChange={setSelectedTags}
      />
      {recipesToDisplay.length > 0 ? (
        <div className="recipe-grid">
          {recipesToDisplay.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} onViewRecipe={onViewRecipe} />
          ))}
        </div>
      ) : (
        <p className="no-recipes">No recipes found matching your criteria. Try adjusting your filters!</p>
      )}
      <PaginationControls
        currentPage={recipesCurrentPage}
        totalPages={totalPages}
        onPageChange={setRecipesCurrentPage}
      />
    </div>
  );
}

export default RecipesPage;