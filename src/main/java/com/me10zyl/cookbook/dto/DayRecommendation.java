package com.me10zyl.cookbook.dto;

import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.Recipes;
import lombok.Data;

import java.util.List;

@Data
public class DayRecommendation {
    private List<CookIngredients> allIngredients;
    private List<Recipes> recipes;
}
