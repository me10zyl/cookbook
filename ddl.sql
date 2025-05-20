-- auto-generated definition
create table cook_ingredients
(
    ingredients_id   int auto_increment
        primary key,
    ingredients_name varchar(30)                        not null comment '食材名称',
    is_meat          tinyint(1)                         not null comment '是否是荤菜 1 是 0 否 ',
    is_main          tinyint(1)                         not null comment '是否是主食 1 是 0 否',
    is_flavour       tinyint(1)                         not null comment '是否是调料 1 是 0 否',
    icon             varchar(30)                        null comment '图片',
    description      varchar(255)                       null comment '食材描述',
    create_time      datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    constraint cook_ingredients_pk_2
        unique (ingredients_name)
)
    comment '食材';

-- auto-generated definition
create table recipes
(
    recipe_id    bigint auto_increment
        primary key,
    recipe_name  varchar(100)                                            not null comment '菜谱名称',
    description  text                                                    null comment '菜谱描述',
    steps        text                                                    not null comment '烹饪步骤',
    image_url    varchar(255)                                            null comment '菜谱图片URL',
    bilibili_url varchar(255)                                            not null comment 'Bilibili视频链接',
    is_meat      tinyint(1)                                              not null comment '是否是荤菜 1 是 0 否 ',
    is_soup      tinyint(1)                                              not null comment '是否是汤 1 是 0 否 ',
    cook_time    int                                                     null comment '烹饪时间（分钟）',
    difficulty   enum ('简单', '中等', '困难') default '简单'            null comment '难度等级',
    created_at   timestamp                     default CURRENT_TIMESTAMP not null,
    updated_at   timestamp                     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
    comment '菜谱信息表';

create index idx_cook_time
    on recipes (cook_time);

-- auto-generated definition
create table recipe_ingredients
(
    recipe_id     int                  not null,
    ingredient_id int                  not null,
    quantity      varchar(50)          null comment '食材用量（如“100g”）',
    is_required   tinyint(1) default 1 null comment '是否为必需食材 1 是 0 否',
    primary key (recipe_id, ingredient_id)
)
    comment '菜谱与食材的关联表';

create index idx_ingredient_id
    on recipe_ingredients (ingredient_id);

