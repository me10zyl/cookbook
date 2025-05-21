package com.me10zyl.cookbook.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.Recipes;
import com.me10zyl.cookbook.exception.ServiceException;
import com.me10zyl.cookbook.repository.RecipesMapper;
import com.me10zyl.cookbook.service.IntegredientsService;
import com.me10zyl.cookbook.service.RecipeIngredientsService;
import com.me10zyl.cookbook.service.RecipeService;
import com.me10zyl.cookbook.util.DataFlow;
import com.me10zyl.cookbook.util.ParamUtil;
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
    public List<CookIngredients> getIngredientsForRecipes(List<Integer> recipeIds) {
        if (recipeIds == null || recipeIds.isEmpty()) {
            return List.of();
        }
        // 用于存储食材名称和对应的总用量
        Map<String, CookIngredients> ingredientMap = new HashMap<>();
        for (Integer recipeId : recipeIds) {
            // 获取每个菜谱的食材列表
            List<CookIngredients> ingredients = integredientsService.findByRecipeId(recipeId.longValue());
            if (ingredients != null) {
                for (CookIngredients ingredient : ingredients) {
                    String ingredientName = ingredient.getIngredientsName();
                    // 从 Map 中获取该食材
                    CookIngredients existingIngredient = ingredientMap.get(ingredientName);
                    if (existingIngredient == null) {
                        ingredientMap.put(ingredientName, ingredient);
                    } else {
                        // 如果 Map 中已存在该食材，累加用量
                        String existingQuantity = existingIngredient.getQuantity();
                        String newQuantity = ingredient.getQuantity();
                        // 解析用量数值和单位
                        double existingAmount = parseQuantity(existingQuantity);
                        //无法解析的情况
                        if(existingAmount == 0){
                            existingIngredient.setQuantity(newQuantity);
                            continue;
                        }
                        double newAmount = parseQuantity(newQuantity);
                        if(newAmount == 0){
                            existingIngredient.setQuantity(newQuantity);
                            continue;
                        }
                        String unit = getUnit(existingQuantity);
                        // 累加用量数值
                        double totalAmount = existingAmount + newAmount;
                        // 拼接新的用量字符串
                        //.0去掉
                        if(totalAmount == (int)totalAmount){
                            existingIngredient.setQuantity((int)totalAmount + unit);
                        }else {
                            existingIngredient.setQuantity(totalAmount + unit);
                        }
                    }
                }
            }
        }
        // 将 Map 中的值转换为 List 返回
        return new ArrayList<>(ingredientMap.values());
    }

    /**
     * 解析用量字符串，提取数值部分
     * @param quantity 用量字符串，如 "1g"
     * @return 数值部分
     */
    private double parseQuantity(String quantity) {
        try {
            // 提取数字部分
            String numberPart = quantity.replaceAll("[^0-9.]", "");
            if (StrUtil.isBlank(numberPart)) {
                return 0;
            }
            return Double.parseDouble(numberPart);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    /**
     * 提取用量字符串的单位部分
     * @param quantity 用量字符串，如 "1g"
     * @return 单位部分
     */
    private String getUnit(String quantity) {
        // 提取非数字部分作为单位
        return quantity.replaceAll("[0-9.]", "");
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
        ParamUtil.checkBlank(recipe, false, "recipeName", "ingredients", "description", "steps", "imageUrl",  "isMeat", "isSoup", "cookTime", "difficulty");
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
        return lambdaQuery()
                .select(Recipes::getRecipeId, Recipes::getRecipeName, Recipes::getDescription
                        , Recipes::getIsMeat, Recipes::getIsSoup, Recipes::getCookTime, Recipes::getDifficulty)
                .like(StrUtil.isNotBlank(name), Recipes::getRecipeName, name).list();
    }

    @Override
    public CookIngredients createIngredient(CookIngredients ingredient) {
        if(integredientsService.hasName(ingredient.getIngredientsName())){
            throw new ServiceException("已有该食材：" + ingredient.getIngredientsName());
        }
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
        recipeIngredientsService.checkRelationship(ingredientId);
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
    public List<Recipes> getHotRecipes() {
        List<Recipes> allRecipes = getAllRecipes(null);
        return allRecipes.subList(0, Math.max(8, allRecipes.size()));
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
                            .filter(recipe -> !recipe.getIsMeat())
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
        categorizedRecipes.put("荤菜", filteredRecipes.stream().filter(Recipes::getIsMeat).collect(Collectors.toList()));
        categorizedRecipes.put("素菜", filteredRecipes.stream().filter(recipe -> !recipe.getIsMeat()).collect(Collectors.toList()));
        categorizedRecipes.put("汤品", filteredRecipes.stream().filter(Recipes::getIsSoup).collect(Collectors.toList()));

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