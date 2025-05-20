package com.em10zyl.cookbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.em10zyl.cookbook.dto.IngredientDTO;
import com.em10zyl.cookbook.dto.RecipeDTO;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.RecipeIngredients;
import com.em10zyl.cookbook.entity.Recipes;
import com.em10zyl.cookbook.repository.CookIngredientsRepository;
import com.em10zyl.cookbook.repository.RecipesRepository;
import com.em10zyl.cookbook.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl extends ServiceImpl<RecipesRepository, Recipes> implements RecipeService {
    @Autowired
    private RecipesRepository recipesRepository;
    
    @Autowired
    private CookIngredientsRepository cookIngredientsRepository;

    @Override
    public RecipeDTO getRecipeById(Long recipeId) {
        Recipes recipe = getById(recipeId);
        if (recipe == null) {
            return null;
        }
        return convertToRecipeDTO(recipe);
    }

    @Override
    public List<RecipeDTO> matchRecipes(List<Long> ingredientIds, Boolean isMeat) {
        List<Recipes> recipes = list();
        if (isMeat != null) {
            recipes = recipes.stream()
                    .filter(recipe -> recipe.getIsMeat() == isMeat)
                    .collect(Collectors.toList());
        }
        
        return recipes.stream()
                .filter(recipe -> {
                    List<RecipeIngredients> recipeIngredients = recipeIngredientsRepository.findByRecipeId(recipe.getRecipeId());
                    Set<Long> requiredIngredientIds = recipeIngredients.stream()
                            .filter(RecipeIngredients::getIsRequired)
                            .map(RecipeIngredients::getIngredientId)
                            .collect(Collectors.toSet());
                    return ingredientIds.containsAll(requiredIngredientIds);
                })
                .map(this::convertToRecipeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<IngredientDTO> getIngredientsForRecipe(Long recipeId) {
        List<RecipeIngredients> recipeIngredients = recipeIngredientsRepository.findByRecipeId(recipeId);
        return recipeIngredients.stream()
                .map(ingredient -> {
                    CookIngredients cookIngredient = cookIngredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                    if (cookIngredient != null) {
                        return convertToIngredientDTO(cookIngredient, ingredient.getQuantity(), ingredient.getIsRequired());
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecipeDTO> getDailyRecommendations(String preference) {
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
        categorizedRecipes.put("主食", filteredRecipes.stream().filter(recipe -> {
            List<RecipeIngredients> ingredients = recipeIngredientsRepository.findByRecipeId(recipe.getRecipeId());
            return ingredients.stream()
                    .anyMatch(ingredient -> {
                        CookIngredients cookIngredient = cookIngredientsRepository.findById(ingredient.getIngredientId()).orElse(null);
                        return cookIngredient != null && cookIngredient.getIsMain();
                    });
        }).collect(Collectors.toList()));

        List<RecipeDTO> recommendations = new ArrayList<>();
        Random random = new Random();
        
        for (List<Recipes> category : categorizedRecipes.values()) {
            if (!category.isEmpty()) {
                int index = random.nextInt(category.size());
                recommendations.add(convertToRecipeDTO(category.get(index)));
            }
        }
        
        return recommendations;
    }

    private RecipeDTO convertToRecipeDTO(Recipes recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setRecipeName(recipe.getRecipeName());
        dto.setDescription(recipe.getDescription());
        dto.setSteps(recipe.getSteps());
        dto.setImageUrl(recipe.getImageUrl());
        dto.setBilibiliUrl(recipe.getBilibiliUrl());
        dto.setIsMeat(recipe.getIsMeat());
        dto.setIsSoup(recipe.getIsSoup());
        dto.setCookTime(recipe.getCookTime());
        dto.setDifficulty(recipe.getDifficulty().name());
        return dto;
    }

    private IngredientDTO convertToIngredientDTO(CookIngredients ingredient, String quantity, Boolean isRequired) {
        IngredientDTO dto = new IngredientDTO();
        dto.setIngredientId(ingredient.getIngredientsId());
        dto.setIngredientName(ingredient.getIngredientsName());
        dto.setIsMeat(ingredient.getIsMeat());
        dto.setIsMain(ingredient.getIsMain());
        dto.setIsFlavour(ingredient.getIsFlavour());
        dto.setIcon(ingredient.getIcon());
        dto.setDescription(ingredient.getDescription());
        dto.setQuantity(quantity);
        dto.setIsRequired(isRequired);
        return dto;
    }
}