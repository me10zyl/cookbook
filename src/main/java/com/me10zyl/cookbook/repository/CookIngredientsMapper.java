package com.me10zyl.cookbook.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.me10zyl.cookbook.entity.CookIngredients;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface CookIngredientsMapper extends BaseMapper<CookIngredients> {
    List<CookIngredients> findByRecipeId(@Param("recipeId") Integer recipeId);
}