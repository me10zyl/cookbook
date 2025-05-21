package com.me10zyl.cookbook.entity;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
@TableName(value = "recipes")
public class Recipes {
    @TableId
    private Integer recipeId;

    
    private String recipeName;

    
    private String description;

    
    private String steps;

    
    private String imageUrl;

    
    private String bilibiliUrl;

    
    private Boolean isMeat;

    
    private Boolean isSoup;

    
    private Integer cookTime;


    private Difficulty difficulty = Difficulty.EASY;

    
    private Timestamp createdAt;

    
    private Timestamp updatedAt;

    @TableField(exist = false)

    List<CookIngredients> ingredients;

    @AllArgsConstructor
    public enum Difficulty implements IEnum<String> {
        EASY("简单"),
        MIDDLE("中等"),
        HARD("困难");
        private String value;

        @Override
        public String getValue() {
            return value;
        }
    }
}