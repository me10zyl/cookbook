package com.em10zyl.cookbook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.Recipes;

import java.util.List;

public interface RecipeService extends IService<Recipes> {
    Recipes getRecipeById(Long recipeId);

    
    List<CookIngredients> getIngredientsForRecipe(Long recipeId);
    
    List<Recipes> getDailyRecommendations(String preference);

    List<Recipes> matchRecipes(List<Long> ingredientIds, Boolean isMeat);

}