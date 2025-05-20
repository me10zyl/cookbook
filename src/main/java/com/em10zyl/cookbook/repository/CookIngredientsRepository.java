package com.em10zyl.cookbook.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.em10zyl.cookbook.entity.CookIngredients;
import org.springframework.stereotype.Repository;

@Repository
public interface CookIngredientsRepository extends BaseMapper<CookIngredients> {
}