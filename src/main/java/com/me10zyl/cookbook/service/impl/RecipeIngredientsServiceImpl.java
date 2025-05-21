package com.me10zyl.cookbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.RecipeIngredients;
import com.me10zyl.cookbook.exception.ServiceException;
import com.me10zyl.cookbook.repository.RecipeIngredientsMapper;
import com.me10zyl.cookbook.service.RecipeIngredientsService;
import com.me10zyl.cookbook.util.DiffUtil;
import com.me10zyl.cookbook.util.ParamUtil;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

import static com.me10zyl.cookbook.util.StreamUtil.mapId;

@Service
public class RecipeIngredientsServiceImpl  extends ServiceImpl<RecipeIngredientsMapper, RecipeIngredients> implements RecipeIngredientsService {
    @Override
    public void saveUpdate(List<CookIngredients> ingredients, Integer recipeId) {
        for (CookIngredients ingredient : ingredients) {
            ParamUtil.checkBlank(ingredient, false, "quantity");
        }
        if(new HashSet<>(mapId(ingredients, CookIngredients::getIngredientsId)).size()
                != ingredients.size()) {
            throw new ServiceException("食材不能重复");
        }
        List<RecipeIngredients> recipeIngredients = listByRecipeId(recipeId);
        DiffUtil.diff(mapId(ingredients, e->{
            return new RecipeIngredients()
                    .setIngredientsId(e.getIngredientsId())
                    .setRecipeId(recipeId)
                    .setRiId(e.getRiId())
                    .setQuantity(e.getQuantity())
                    ;
        }), recipeIngredients, RecipeIngredients::getIngredientsId)
                .applyPatch(this);
    }

    @Override
    public void deleteByRecipeId(Integer recipeId) {
        lambdaUpdate().eq(RecipeIngredients::getRecipeId, recipeId).remove();
    }

    @Override
    public void checkRelationship(Integer ingredientId) {
        if(lambdaQuery().eq(RecipeIngredients::getIngredientsId, ingredientId).count() > 0){
            throw new ServiceException("该食材被使用，无法删除");
        }
    }

    private List<RecipeIngredients> listByRecipeId(Integer recipeId) {
        return lambdaQuery().eq(RecipeIngredients::getRecipeId, recipeId).list();
    }
}
