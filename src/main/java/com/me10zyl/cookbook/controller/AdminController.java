package com.me10zyl.cookbook.controller;

import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.Recipes;
import com.me10zyl.cookbook.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private RecipeService recipeService;

    // 新增菜谱
    @PostMapping("/recipe/create")
    public ResponseEntity<Recipes> createRecipe(@RequestBody Recipes recipe) {
        Recipes createdRecipe = recipeService.createRecipe(recipe);
        return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
    }


    // 删除原料
    @DeleteMapping("/ingredients/delete/{ingredientId}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Integer ingredientId) {
        recipeService.deleteIngredient(ingredientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    // 更新菜谱
    @PostMapping("/recipe/update/{recipeId}")
    public ResponseEntity<Recipes> updateRecipe(@PathVariable Integer recipeId, @RequestBody Recipes recipe) {
        Recipes updatedRecipe = recipeService.updateRecipe(recipeId, recipe);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

    // 删除菜谱
    @GetMapping("/recipe/delete/{recipeId}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer recipeId) {
        recipeService.deleteRecipe(recipeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 获取所有原料
    @GetMapping("/ingredients/list")
    public ResponseEntity<List<CookIngredients>> getAllIngredients() {
        List<CookIngredients> ingredients = recipeService.getAllIngredients();
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    // 新增原料
    @PostMapping("/ingredients/create")
    public ResponseEntity<CookIngredients> createIngredient(@RequestBody CookIngredients ingredient) {
        CookIngredients createdIngredient = recipeService.createIngredient(ingredient);
        return new ResponseEntity<>(createdIngredient, HttpStatus.CREATED);
    }

    // 更新原料
    @PutMapping("/ingredients/update/{ingredientId}")
    public ResponseEntity<CookIngredients> updateIngredient(@PathVariable Integer ingredientId, @RequestBody CookIngredients ingredient) {
        CookIngredients updatedIngredient = recipeService.updateIngredient(ingredientId, ingredient);
        return new ResponseEntity<>(updatedIngredient, HttpStatus.OK);
    }
}
