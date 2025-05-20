package com.em10zyl.cookbook.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cook_ingredients")
public class CookIngredients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredients_id")
    private Integer ingredientsId;

    @Column(name = "ingredients_name", nullable = false, unique = true)
    private String ingredientsName;

    @Column(name = "is_meat", nullable = false)
    private boolean isMeat;

    @Column(name = "is_main", nullable = false)
    private boolean isMain;

    @Column(name = "is_flavour", nullable = false)
    private boolean isFlavour;

    @Column(name = "icon")
    private String icon;

    @Column(name = "description")
    private String description;

    @Column(name = "create_time", nullable = false, insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    // Getters and Setters
    public Integer getIngredientsId() {
        return ingredientsId;
    }

    public void setIngredientsId(Integer ingredientsId) {
        this.ingredientsId = ingredientsId;
    }

    public String getIngredientsName() {
        return ingredientsName;
    }

    public void setIngredientsName(String ingredientsName) {
        this.ingredientsName = ingredientsName;
    }

    public boolean getIsMeat() {
        return isMeat;
    }

    public void setIsMeat(boolean isMeat) {
        this.isMeat = isMeat;
    }

    public boolean getIsMain() {
        return isMain;
    }

    public void setIsMain(boolean isMain) {
        this.isMain = isMain;
    }

    public boolean getIsFlavour() {
        return isFlavour;
    }

    public void setIsFlavour(boolean isFlavour) {
        this.isFlavour = isFlavour;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}