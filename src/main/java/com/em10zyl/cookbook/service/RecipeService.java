package com.em10zyl.cookbook.service;

import com.em10zyl.cookbook.dto.RecipeDTO;
import com.em10zyl.cookbook.dto.IngredientDTO;
import java.util.List;

public interface RecipeService {
    RecipeDTO getRecipeById(Long recipeId);
    
    List<RecipeDTO> matchRecipes(List<Long> ingredientIds, Boolean isMeat);
    
    List<IngredientDTO> getIngredientsForRecipe(Long recipeId);
    
    List<RecipeDTO> getDailyRecommendations(String preference);
}