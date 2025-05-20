package com.em10zyl.cookbook.entity;

import javax.persistence.*;

@Entity
@Table(name = "recipe_ingredients")
public class RecipeIngredients {
    @Id
    @Column(name = "recipe_id")
    private int recipeId;

    @Id
    @Column(name = "ingredient_id")
    private int ingredientId;

    @Column(name = "quantity")
    private String quantity;

    @Column(name = "is_required")
    private boolean isRequired = true;

    // Getters and Setters
    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public boolean getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(boolean isRequired) {
        this.isRequired = isRequired;
    }
}