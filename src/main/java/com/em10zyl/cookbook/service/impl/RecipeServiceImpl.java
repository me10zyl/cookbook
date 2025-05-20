package com.em10zyl.cookbook.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.Recipes;
import com.em10zyl.cookbook.exception.ServiceException;
import com.em10zyl.cookbook.repository.RecipesMapper;
import com.em10zyl.cookbook.service.IntegredientsService;
import com.em10zyl.cookbook.service.RecipeIngredientsService;
import com.em10zyl.cookbook.service.RecipeService;
import com.em10zyl.cookbook.util.DataFlow;
import com.em10zyl.cookbook.util.ParamUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl extends ServiceImpl<RecipesMapper, Recipes> implements RecipeService {
    
    private final IntegredientsService integredientsService;
    private final RecipeIngredientsService recipeIngredientsService;

    @Override
    public Recipes getRecipeById(Long recipeId) {
        Recipes recipe = getById(recipeId);
        if (recipe == null) {
            return null;
        }
        recipe.setIngredients(integredientsService.findByRecipeId(recipeId));
        return recipe;
    }

    @Override
    public List<CookIngredients> getIngredientsForRecipe(Long recipeId) {
        return List.of();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Recipes createRecipe(Recipes recipe) {
        save(recipe);
        DataFlow dataFlow = checkParams(recipe);
        recipeIngredientsService.saveUpdate(dataFlow.get("ingredients"), recipe.getRecipeId());
        return recipe;
    }

    private DataFlow checkParams(Recipes recipe) {
        ParamUtil.checkBlank(recipe, false, "recipeName", "description", "steps", "imageUrl", "bilibiliUrl", "isMeat", "isSoup", "cookTime", "difficulty");
        DataFlow dataFlow = new DataFlow();
        List<CookIngredients> ingredients = recipe.getIngredients();
        if(CollUtil.isEmpty(ingredients)){
            throw new ServiceException("食材不能为空");
        }
        dataFlow.put("ingredients", ingredients);
        return dataFlow;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Recipes updateRecipe(Integer recipeId, Recipes recipe) {
        recipe.setRecipeId(recipeId);
        DataFlow dataFlow = checkParams(recipe);
        updateById(recipe);
        recipeIngredientsService.saveUpdate(dataFlow.get("ingredients"), recipe.getRecipeId());
        return recipe;
    }

    @Override
    public void deleteRecipe(Integer recipeId) {
        recipeIngredientsService.deleteByRecipeId(recipeId);
        removeById(recipeId);
    }

    @Override
    public List<Recipes> getAllRecipes(String name) {
        if (StrUtil.isNotBlank(name)) {
            return lambdaQuery().like(Recipes::getRecipeName, name).list();
        }
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