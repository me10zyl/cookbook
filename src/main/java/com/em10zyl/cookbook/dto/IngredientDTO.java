package com.em10zyl.cookbook.dto;

public class IngredientDTO {
    private Integer ingredientId;
    private String ingredientName;
    private Boolean isMeat;
    private Boolean isMain;
    private Boolean isFlavour;
    private String icon;
    private String description;
    private String quantity;
    private Boolean isRequired;
    
    // Getters and Setters
    public Integer getIngredientId() {
        return ingredientId;
    }
    
    public void setIngredientId(Integer ingredientId) {
        this.ingredientId = ingredientId;
    }
    
    public String getIngredientName() {
        return ingredientName;
    }
    
    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }
    
    public Boolean getIsMeat() {
        return isMeat;
    }
    
    public void setIsMeat(Boolean isMeat) {
        this.isMeat = isMeat;
    }
    
    public Boolean getIsMain() {
        return isMain;
    }
    
    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }
    
    public Boolean getIsFlavour() {
        return isFlavour;
    }
    
    public void setIsFlavour(Boolean isFlavour) {
        this.isFlavour = isFlavour;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getQuantity() {
        return quantity;
    }
    
    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    
    public Boolean getIsRequired() {
        return isRequired;
    }
    
    public void setIsRequired(Boolean isRequired) {
        this.isRequired = isRequired;
    }
}