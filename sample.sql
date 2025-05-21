INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('鸡肉', 1, 0, 0, 'chicken_icon.png', '新鲜去骨鸡肉', '200g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('胡萝卜', 0, 0, 0, 'carrot_icon.png', '新鲜胡萝卜', '100g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('盐', 0, 0, 1, 'salt_icon.png', '普通食用盐', '适量');

INSERT INTO recipes (recipe_name, description, steps, image_url, bilibili_url, is_meat, is_soup, cook_time, difficulty) VALUES
    ('鸡肉胡萝卜汤', '一道简单美味的鸡肉胡萝卜汤', '[{"stepNumber": 1, "description": "将鸡肉切块，胡萝卜切片。"}, {"stepNumber": 2, "description": "锅中加水烧开，放入鸡肉煮至变色。"}, {"stepNumber": 3, "description": "加入胡萝卜，调入适量盐，继续煮至胡萝卜软烂。"}]', 'chicken_carrot_soup.jpg', 'https://www.bilibili.com/video/BV123456789', 1, 1, 30, '简单');

INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity, is_required) VALUES
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '鸡肉'), '200g', 1),
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '胡萝卜'), '100g', 1),
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '盐'), '适量', 1);