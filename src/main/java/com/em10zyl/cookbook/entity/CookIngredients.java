package com.em10zyl.cookbook.entity;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;


@TableName("cook_ingredients")
@Data
public class CookIngredients {
    @TableId
    private Integer ingredientsId;
    
    private String ingredientsName;


    private boolean isMeat;

    
    private boolean isMain;

    
    private boolean isFlavour;

    
    private String icon;

    
    private String description;


    private Date createTime;

    @TableField(exist = false)
    private String quantity;

    @TableField(exist = false)
    private boolean isRequired = true;
    //默认用量
    private String defaultQuantity;
}