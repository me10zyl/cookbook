package com.me10zyl.cookbook.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@TableName(value = "recipe_ingredients")
@Accessors(chain = true)
public class RecipeIngredients {
    @TableId
    private Integer riId;
    private Integer recipeId;
    private Integer ingredientsId;
    private String quantity;
}
