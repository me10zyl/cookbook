package com.em10zyl.cookbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.Recipes;
import com.em10zyl.cookbook.repository.RecipesMapper;
import com.em10zyl.cookbook.service.IntegredientsService;
import com.em10zyl.cookbook.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl extends ServiceImpl<RecipesMapper, Recipes> implements RecipeService {
    
    private final IntegredientsService integredientsService;

    @Override
    public Recipes getRecipeById(Long recipeId) {
        Recipes recipe = getById(recipeId);
        if (recipe == null) {
            return null;
        }
        return recipe;
    }

    @Override
    public List<CookIngredients> getIngredientsForRecipe(Long recipeId) {
        return List.of();
    }

    @Override
    public Recipes createRecipe(Recipes recipe) {
        save(recipe);
        return recipe;
    }

    @Override
    public Recipes updateRecipe(Long recipeId, Recipes recipe) {
        recipe.setRecipeId(recipeId);
        updateById(recipe);
        return recipe;
    }

    @Override
    public void deleteRecipe(Integer recipeId) {
        removeById(recipeId);
    }

    @Override
    public List<Recipes> getAllRecipes() {
        return list();
    }

    @Override
    public CookIngredients createIngredient(CookIngredients ingredient) {
        integredientsService.save(ingredient);
        return ingredient;
    }

    @Override
    public CookIngredients updateIngredient(Integer ingredientId, CookIngredients ingredient) {
        ingredient.setIngredientsId(ingredientId);
        integredientsService.updateById(ingredient);
        return ingredient;
    }

    @Override
    public void deleteIngredient(Integer ingredientId) {
        integredientsService.removeById(ingredientId);
    }

    @Override
    public List<CookIngredients> getAllIngredients() {
        return integredientsService.list();
    }

    @Override
    public List<Recipes> matchRecipes(List<Long> ingredientIds, Boolean isMeat) {
        // 这里需要实现具体的食材匹配逻辑
        return new ArrayList<>();
    }

    @Override
    public List<Recipes> getDailyRecommendations(String preference) {
        List<Recipes> allRecipes = list();
        List<Recipes> filteredRecipes = allRecipes;
        
        if (preference != null) {
            switch (preference.toLowerCase()) {
                case "低脂":
                    // 假设低脂过滤逻辑
                    filteredRecipes = allRecipes.stream()
                            .filter(recipe -> /* 低脂过滤条件 */ true)
                            .collect(Collectors.toList());
                    break;
                case "素食":
                    filteredRecipes = allRecipes.stream()
                            .filter(recipe -> !recipe.isMeat())
                            .collect(Collectors.toList());
                    break;
                case "快速烹饪":
                    filteredRecipes = allRecipes.stream()
                            .filter(recipe -> recipe.getCookTime() != null && recipe.getCookTime() <= 30)
                            .collect(Collectors.toList());
                    break;
            }
        }
        
        // 随机选择多道菜谱，保证类型均衡
        Map<String, List<Recipes>> categorizedRecipes = new HashMap<>();
        categorizedRecipes.put("荤菜", filteredRecipes.stream().filter(Recipes::isMeat).collect(Collectors.toList()));
        categorizedRecipes.put("素菜", filteredRecipes.stream().filter(recipe -> !recipe.isMeat()).collect(Collectors.toList()));
        categorizedRecipes.put("汤品", filteredRecipes.stream().filter(Recipes::isSoup).collect(Collectors.toList()));

        List<Recipes> recommendations = new ArrayList<>();
        Random random = new Random();
        
        for (List<Recipes> category : categorizedRecipes.values()) {
            if (!category.isEmpty()) {
                int index = random.nextInt(category.size());
                recommendations.add(category.get(index));
            }
        }
        
        return recommendations;
    }
}