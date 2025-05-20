package com.em10zyl.cookbook.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.em10zyl.cookbook.entity.Recipes;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipesRepository extends BaseMapper<Recipes> {
}