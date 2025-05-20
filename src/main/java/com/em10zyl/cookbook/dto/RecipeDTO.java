package com.em10zyl.cookbook.dto;

import java.util.List;

public class RecipeDTO {
    private Long recipeId;
    private String recipeName;
    private String description;
    private String steps;
    private String imageUrl;
    private String bilibiliUrl;
    private Boolean isMeat;
    private Boolean isSoup;
    private Integer cookTime;
    private String difficulty;
    
    // Getters and Setters
    public Long getRecipeId() {
        return recipeId;
    }
    
    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }
    
    public String getRecipeName() {
        return recipeName;
    }
    
    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getSteps() {
        return steps;
    }
    
    public void setSteps(String steps) {
        this.steps = steps;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getBilibiliUrl() {
        return bilibiliUrl;
    }
    
    public void setBilibiliUrl(String bilibiliUrl) {
        this.bilibiliUrl = bilibiliUrl;
    }
    
    public Boolean getIsMeat() {
        return isMeat;
    }
    
    public void setIsMeat(Boolean isMeat) {
        this.isMeat = isMeat;
    }
    
    public Boolean getIsSoup() {
        return isSoup;
    }
    
    public void setIsSoup(Boolean isSoup) {
        this.isSoup = isSoup;
    }
    
    public Integer getCookTime() {
        return cookTime;
    }
    
    public void setCookTime(Integer cookTime) {
        this.cookTime = cookTime;
    }
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}