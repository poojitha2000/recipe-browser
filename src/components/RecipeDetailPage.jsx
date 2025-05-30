import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

function RecipeDetailPage({ recipeId, onBack }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!recipeId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchData(`${API_BASE_URL}lookup.php?i=${recipeId}`);
        if (data.meals && data.meals.length > 0) {
          setRecipeDetails(data.meals[0]);
        } else {
          throw new Error('Recipe not found.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);

  if (isLoading) return <p className="loading">Loading recipe details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!recipeDetails) return <p className="loading">Recipe details not available.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetails[`strIngredient${i}`];
    const measure = recipeDetails[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure: measure || '' });
    }
  }

  const tagsArray = recipeDetails.strTags ? recipeDetails.strTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>← Back to Recipes</button>
      <div className="recipe-detail">
        <img
          src={recipeDetails.strMealThumb}
          alt={recipeDetails.strMeal}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/f0f0f0/333?text=${recipeDetails.strMeal.split(' ').join('+')}`;
          }}
        />
        <div className="content">
          <h1>{recipeDetails.strMeal}</h1>
          <div className="category">
            <span>Category: </span>
            <span>{recipeDetails.strCategory}</span>
          </div>
          {tagsArray.length > 0 && (
            <div className="tags">
              <span>Tags: </span>
              {tagsArray.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.measure && <span>{item.measure}</span>} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Instructions</h2>
            <p className="instructions">{recipeDetails.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;