package com.em10zyl.cookbook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.Recipes;

import java.util.List;

public interface RecipeService extends IService<Recipes> {
    Recipes getRecipeById(Long recipeId);

    
    List<CookIngredients> getIngredientsForRecipe(Long recipeId);
    
    List<Recipes> getDailyRecommendations(String preference);

    Recipes createRecipe(Recipes recipe);

    Recipes updateRecipe(Long recipeId, Recipes recipe);

    void deleteRecipe(Integer recipeId);

    List<Recipes> getAllRecipes(String name);

    CookIngredients createIngredient(CookIngredients ingredient);

    CookIngredients updateIngredient(Integer ingredientId, CookIngredients ingredient);

    void deleteIngredient(Integer ingredientId);

    List<CookIngredients> getAllIngredients();

    List<Recipes> matchRecipes(List<Long> ingredientIds, Boolean isMeat);

}