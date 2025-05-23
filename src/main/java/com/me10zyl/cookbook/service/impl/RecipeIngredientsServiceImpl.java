package com.me10zyl.cookbook.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.RecipeIngredients;
import com.me10zyl.cookbook.exception.ServiceException;
import com.me10zyl.cookbook.repository.RecipeIngredientsMapper;
import com.me10zyl.cookbook.service.IntegredientsService;
import com.me10zyl.cookbook.service.RecipeIngredientsService;
import com.me10zyl.cookbook.util.DiffUtil;
import com.me10zyl.cookbook.util.ParamUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.me10zyl.cookbook.util.StreamUtil.filter;
import static com.me10zyl.cookbook.util.StreamUtil.mapId;

@Service
public class RecipeIngredientsServiceImpl  extends ServiceImpl<RecipeIngredientsMapper, RecipeIngredients> implements RecipeIngredientsService {

    @Autowired
    private IntegredientsService integredientsService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveUpdate(List<CookIngredients> ingredients, Integer recipeId) {
        for (CookIngredients ingredient : ingredients) {
            ParamUtil.checkBlank(ingredient, false, "quantity");
        }
        //检查重复
        checkDuplicate(ingredients);

        List<CookIngredients> filter = filter(ingredients, e -> e.getIngredientsId() == null);
        for (CookIngredients cookIngredients : filter) {
            String ingredientsName = cookIngredients.getIngredientsName();
            if(StrUtil.isBlank(ingredientsName)){
                throw new ServiceException("食材名称不能为空");
            }
            CookIngredients exists = integredientsService.
                    lambdaQuery().eq(CookIngredients::getIngredientsName, ingredientsName).last("limit 1").one();
            if(exists != null){
                cookIngredients.setIngredientsId(exists.getIngredientsId());
                continue;
            }
            cookIngredients.setIsMain(false);
            cookIngredients.setIsFlavour(false);
            cookIngredients.setIsMeat(false);
            integredientsService.save(cookIngredients);
        }
        filter = filter(ingredients, e -> e.getIngredientsId() == null);
        List<CookIngredients> filter2 = filter(ingredients, e -> e.getIngredientsId() != null);

        if(CollUtil.isNotEmpty(filter)) {
            saveBatch(mapId(filter, e -> {
                RecipeIngredients recipeIngredients = new RecipeIngredients();
                recipeIngredients.setRecipeId(recipeId);
                recipeIngredients.setIngredientsId(e.getIngredientsId());
                recipeIngredients.setQuantity(e.getQuantity());
                return recipeIngredients;
            }));
        }

        List<RecipeIngredients> recipeIngredients = listByRecipeId(recipeId);
        DiffUtil.diff(mapId(filter2, e->{
            return new RecipeIngredients()
                    .setIngredientsId(e.getIngredientsId())
                    .setRecipeId(recipeId)
                    .setRiId(e.getRiId())
                    .setQuantity(e.getQuantity())
                    ;
        }), recipeIngredients, RecipeIngredients::getIngredientsId)
                .applyPatch(this);
    }

    private static void checkDuplicate(List<CookIngredients> ingredients) {
        Set<Integer> ids = new HashSet<>();
        Set<String> names = new HashSet<>();
        for (CookIngredients ingredient : filter(ingredients,e->e.getIngredientsId() != null)) {
            if(ids.contains(ingredient.getIngredientsId())){
                throw new ServiceException("食材ID重复");
            }
            ids.add(ingredient.getIngredientsId());
        }
        for (CookIngredients ingredient : filter(ingredients,e->e.getIngredientsId() == null
        && StrUtil.isNotBlank(e.getIngredientsName()))) {
            if(names.contains(ingredient.getIngredientsName())){
                throw new ServiceException("食材名称重复:" + ingredient.getIngredientsName());
            }
            names.add(ingredient.getIngredientsName());
        }
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
