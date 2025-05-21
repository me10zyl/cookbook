INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('鸡肉', 1, 0, 0, 'chicken_icon.png', '新鲜去骨鸡肉', '200g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('胡萝卜', 0, 0, 0, 'carrot_icon.png', '新鲜胡萝卜', '100g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('盐', 0, 0, 1, 'salt_icon.png', '普通食用盐', '适量');

INSERT INTO recipes (recipe_name, description, steps, image_url, bilibili_url, is_meat, is_soup, cook_time, difficulty) VALUES
    ('鸡肉胡萝卜汤', '一道简单美味的鸡肉胡萝卜汤', '[{"stepNumber": 1, "description": "将鸡肉切块，胡萝卜切片。"}, {"stepNumber": 2, "description": "锅中加水烧开，放入鸡肉煮至变色。"}, {"stepNumber": 3, "description": "加入胡萝卜，调入适量盐，继续煮至胡萝卜软烂。"}]', 'chicken_carrot_soup.jpg', 'https://www.bilibili.com/video/BV123456789', 1, 1, 30, '简单');

INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity, is_required) VALUES
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '鸡肉'), '200g', 1),
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '胡萝卜'), '100g', 1),
                                                                                      ((SELECT recipe_id FROM recipes WHERE recipe_name = '鸡肉胡萝卜汤'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '盐'), '适量', 1);




INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('新鲜鸡胸肉', 1, 0, 0, 'chicken.png', '优质去皮鸡胸肉', '200g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('西兰花', 0, 0, 0, 'broccoli.png', '新鲜西兰花', '150g');
INSERT INTO cook_ingredients (ingredients_name, is_meat, is_main, is_flavour, icon, description, default_quantity) VALUES ('橄榄油', 0, 0, 1, 'olive_oil.png', '特级初榨橄榄油', '2 tbsp');
INSERT INTO recipes (recipe_name, description, steps, image_url, bilibili_url, is_meat, is_soup, cook_time, difficulty) VALUES ('蒜香烤鸡胸肉配西兰花', '这是一道简单美味的蒜香烤鸡胸肉配西兰花的食谱', '[{"stepNumber": 1, "description": "预热烤箱至200°C。"}, {"stepNumber": 2, "description": "将鸡胸肉用厨房纸巾拍干，两面撒上盐和黑胡椒。"}, {"stepNumber": 3, "description": "在鸡胸肉上均匀涂抹一层橄榄油，再撒上切碎的大蒜。"}, {"stepNumber": 4, "description": "将鸡胸肉放入烤盘，烤约20分钟或直到完全熟透。"}, {"stepNumber": 5, "description": "同时，将西兰花洗净切成小朵，用沸水焯烫1分钟，捞出沥干。"}, {"stepNumber": 6, "description": "在锅中加热少许橄榄油，加入西兰花快速翻炒，加盐调味。"}, {"stepNumber": 7, "description": "将烤好的鸡胸肉和炒好的西兰花摆盘即可。"}]', 'https://example.com/garlic_chicken_broccoli.jpg', 'https://www.bilibili.com/video/BV123456789', 1, 0, 30, '简单');
INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity) VALUES ((SELECT recipe_id FROM recipes WHERE recipe_name = '蒜香烤鸡胸肉配西兰花'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '新鲜鸡胸肉'), '200g');
INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity) VALUES ((SELECT recipe_id FROM recipes WHERE recipe_name = '蒜香烤鸡胸肉配西兰花'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '西兰花'), '150g');
INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity) VALUES ((SELECT recipe_id FROM recipes WHERE recipe_name = '蒜香烤鸡胸肉配西兰花'), (SELECT ingredients_id FROM cook_ingredients WHERE ingredients_name = '橄榄油'), '2 tbsp');