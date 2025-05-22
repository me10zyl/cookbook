package com.me10zyl.cookbook.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.me10zyl.cookbook.entity.Recipes;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface RecipesMapper extends BaseMapper<Recipes> {
    List<Recipes> findRecipesByIngredients(@Param("ingredientIds") List<Integer> ingredientIds);

    List<Recipes> getBalanceRecipes();

    List<Recipes> getVegetablesRecipes();

    List<Recipes> getQuickRecipes();
}