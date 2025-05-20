package com.em10zyl.cookbook.controller;

import com.em10zyl.cookbook.dto.RecipeDTO;
import com.em10zyl.cookbook.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    // 菜谱展示页面
    @GetMapping("/{recipeId}")
    public ResponseEntity<RecipeDTO> getRecipeDetails(@PathVariable Long recipeId) {
        RecipeDTO recipe = recipeService.getRecipeById(recipeId);
        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    // 食材匹配菜谱页面
    @PostMapping("/match")
    public ResponseEntity<List<RecipeDTO>> matchRecipesByIngredients(
            @RequestBody List<Long> ingredientIds, 
            @RequestParam(required = false) Boolean isMeat) {
        List<RecipeDTO> recipes = recipeService.matchRecipes(ingredientIds, isMeat);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    // 菜谱反查食材页面
    @GetMapping("/{recipeId}/ingredients")
    public ResponseEntity<List<IngredientDTO>> getIngredientsByRecipe(@PathVariable Long recipeId) {
        List<IngredientDTO> ingredients = recipeService.getIngredientsForRecipe(recipeId);
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    // 每日随机菜谱推荐页面
    @GetMapping("/daily-recommendations")
    public ResponseEntity<List<RecipeDTO>> getDailyRecommendations(
            @RequestParam(required = false) String preference) {
        List<RecipeDTO> recommendations = recipeService.getDailyRecommendations(preference);
        return new ResponseEntity<>(recommendations, HttpStatus.OK);
    }
}