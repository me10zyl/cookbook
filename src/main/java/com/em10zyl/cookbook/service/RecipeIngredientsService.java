package com.em10zyl.cookbook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.RecipeIngredients;

import java.util.List;

public interface RecipeIngredientsService extends IService<RecipeIngredients> {
    void saveUpdate(List<CookIngredients> ingredients, Integer recipeId);

    void deleteByRecipeId(Integer recipeId);
}
