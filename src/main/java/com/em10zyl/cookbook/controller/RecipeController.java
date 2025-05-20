package com.em10zyl.cookbook.controller;


import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.Recipes;
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
    public ResponseEntity<Recipes> getRecipeDetails(@PathVariable Long recipeId) {
        Recipes recipe = recipeService.getRecipeById(recipeId);
        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    // 食材匹配菜谱页面
    @PostMapping("/match")
    public ResponseEntity<List<Recipes>> matchRecipesByIngredients(
            @RequestBody List<Long> ingredientIds, 
            @RequestParam(required = false) Boolean isMeat) {
        List<Recipes> recipes = recipeService.matchRecipes(ingredientIds, isMeat);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    // 菜谱反查食材页面
    @GetMapping("/{recipeId}/ingredients")
    public ResponseEntity<List<CookIngredients>> getIngredientsByRecipe(@PathVariable Long recipeId) {
        List<CookIngredients> ingredients = recipeService.getIngredientsForRecipe(recipeId);
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    // 每日随机菜谱推荐页面
    @GetMapping("/daily-recommendations")
    public ResponseEntity<List<Recipes>> getDailyRecommendations(
            @RequestParam(required = false) String preference) {
        List<Recipes> recommendations = recipeService.getDailyRecommendations(preference);
        return new ResponseEntity<>(recommendations, HttpStatus.OK);
    }

    // 获取所有菜谱
    @GetMapping("/list")
    public ResponseEntity<List<Recipes>> getAllRecipes() {
        List<Recipes> recipes = recipeService.getAllRecipes();
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }
}