package com.me10zyl.cookbook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.me10zyl.cookbook.dto.DayRecommendation;
import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.Recipes;

import java.util.List;

public interface RecipeService extends IService<Recipes> {
    Recipes getRecipeById(Integer recipeId);

    
    List<CookIngredients> getIngredientsForRecipes(List<Integer> recipeIds);
    
    DayRecommendation getDailyRecommendations(String preference);

    Recipes createRecipe(Recipes recipe);

    Recipes updateRecipe(Integer recipeId, Recipes recipe);

    void deleteRecipe(Integer recipeId);

    List<Recipes> getAllRecipes(String name);

    CookIngredients createIngredient(CookIngredients ingredient);

    CookIngredients updateIngredient(Integer ingredientId, CookIngredients ingredient);

    void deleteIngredient(Integer ingredientId);

    List<CookIngredients> getAllIngredients();

    List<Recipes> getHotRecipes();

    List<Recipes> matchRecipes(List<Integer> ingredientsIds);
}