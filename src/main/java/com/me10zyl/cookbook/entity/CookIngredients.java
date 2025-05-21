package com.me10zyl.cookbook.entity;


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


    private Boolean isMeat;

    
    private Boolean isMain;

    
    private Boolean isFlavour;

    
    private String icon;

    
    private String description;


    private Date createTime;

    @TableField(exist = false)
    private String quantity;

    @TableField(exist = false)
    private boolean isRequired = true;
    @TableField(exist = false)
    private Integer riId;

    //默认用量
    private String defaultQuantity;
}