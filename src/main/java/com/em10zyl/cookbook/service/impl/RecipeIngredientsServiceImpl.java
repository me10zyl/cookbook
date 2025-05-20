package com.em10zyl.cookbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.em10zyl.cookbook.entity.CookIngredients;
import com.em10zyl.cookbook.entity.RecipeIngredients;
import com.em10zyl.cookbook.repository.RecipeIngredientsMapper;
import com.em10zyl.cookbook.service.RecipeIngredientsService;
import com.em10zyl.cookbook.util.DiffUtil;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.em10zyl.cookbook.util.StreamUtil.mapId;

@Service
public class RecipeIngredientsServiceImpl  extends ServiceImpl<RecipeIngredientsMapper, RecipeIngredients> implements RecipeIngredientsService {
    @Override
    public void saveUpdate(List<CookIngredients> ingredients, Integer recipeId) {
        List<RecipeIngredients> recipeIngredients = listByRecipeId(recipeId);
        DiffUtil.diff(mapId(ingredients, e->{
            return new RecipeIngredients().setIngredientId(e.getIngredientsId()).setRecipeId(recipeId);
        }), recipeIngredients, RecipeIngredients::getIngredientId)
                .applyPatch(this);
    }

    @Override
    public void deleteByRecipeId(Integer recipeId) {
        lambdaUpdate().eq(RecipeIngredients::getRecipeId, recipeId).remove();
    }

    private List<RecipeIngredients> listByRecipeId(Integer recipeId) {
        return lambdaQuery().eq(RecipeIngredients::getRecipeId, recipeId).list();
    }
}
