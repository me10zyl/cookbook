package com.em10zyl.cookbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.repository.CookIngredientsMapper;
import com.em10zyl.cookbook.service.IntegredientsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IntegredientsServiceImpl extends ServiceImpl<CookIngredientsMapper, CookIngredients> implements IntegredientsService {
    @Override
    public List<CookIngredients> findByRecipeId(Long recipeId) {
        return List.of();
    }
}
