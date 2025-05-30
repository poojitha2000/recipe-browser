import React from 'react';

function RecipeCard({ recipe, onViewRecipe }) {
  return (
    <div className="recipe-card" onClick={() => onViewRecipe(recipe.idMeal)}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/300x200/f0f0f0/333?text=${recipe.strMeal.split(' ').join('+')}`;
        }}
      />
      <div className="content">
        <h3 title={recipe.strMeal}>{recipe.strMeal}</h3>
      </div>
    </div>
  );
}

export default RecipeCard;