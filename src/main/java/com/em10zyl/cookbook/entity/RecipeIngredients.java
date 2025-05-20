package com.em10zyl.cookbook.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "recipe_ingredients")
public class RecipeIngredients {
    private Integer recipeId;
    private Integer ingredientId;
    private String quantity;
    private boolean isRequired  ;
}
