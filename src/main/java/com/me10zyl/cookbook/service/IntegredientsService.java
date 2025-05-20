package com.me10zyl.cookbook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.me10zyl.cookbook.entity.CookIngredients;

import java.util.List;

public interface IntegredientsService extends IService<CookIngredients> {
    List<CookIngredients> findByRecipeId(Long recipeId);
}
