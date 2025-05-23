package com.me10zyl.cookbook.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.me10zyl.cookbook.dto.Step;
import com.me10zyl.cookbook.entity.CookIngredients;
import com.me10zyl.cookbook.entity.Recipes;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextToRecipeConverter {

    public static Recipes convertTextToRecipe(String text) {
        Recipes recipe = new Recipes();

        // 提取菜谱名称
        String recipeName = extractField(text, "(?:\\*\\*)?菜谱名称(?:\\*\\*)?：(.*?)\n");
        recipe.setRecipeName(recipeName);

        // 提取描述
        String description = extractField(text, "(?:\\*\\*)?描述(?:\\*\\*)?：(.*?)\n");
        recipe.setDescription(description);

        // 提取图片 URL
        String imageUrl = extractField(text, "(?:\\*\\*)?图片 URL(?:\\*\\*)?：(.*?)\n");
        recipe.setImageUrl(imageUrl);

        // 提取 bilibili 视频 URL
        String bilibiliUrl = extractField(text, "(?:\\*\\*)?bilibili 视频 URL(?:\\*\\*)?：(.*?)\n");
        recipe.setBilibiliUrl(bilibiliUrl);

        // 提取食材
        String ingredientsText = extractField(text, "(?:\\*\\*)?选择食材(?:\\*\\*)?：(.*?)\n");
        List<CookIngredients> ingredients = parseIngredients(ingredientsText);
        recipe.setIngredients(ingredients);

        // 提取烹饪步骤
        String steps = handleSteps(text);
        recipe.setSteps(steps.trim());

        // 提取是否荤菜
        boolean isMeat = extractBooleanField(text, "(?:\\*\\*)?是否荤菜(?:\\*\\*)?：(.*?)\n");
        recipe.setIsMeat(isMeat);

        // 提取是否汤类
        boolean isSoup = extractBooleanField(text, "(?:\\*\\*)?是否汤类(?:\\*\\*)?：(.*?)\n");
        recipe.setIsSoup(isSoup);

        // 提取烹饪时间
        String cookTime = extractField(text, "(?:\\*\\*)?烹饪时间（分钟）(?:\\*\\*)?：(.*?)\n");
        recipe.setCookTime(Integer.parseInt(cookTime));

        // 提取难度
        String difficulty = extractField(text, "难度：(.*?)$");
        for (Recipes.Difficulty value : Recipes.Difficulty.values()) {
            if(value.getValue().equals(difficulty)){
                recipe.setDifficulty(value);
                break;
            }
        }
        return recipe;
    }

    private static String handleSteps(String text) {
        List<Step> steps = new ArrayList<>();
        // 正则表达式匹配步骤编号和描述
        Matcher matcher1 = Pattern.compile("(?:\\*\\*)?烹饪步骤(?:\\*\\*)?：").matcher(text);
        matcher1.find();
        Pattern pattern = Pattern.compile("(\\d+)\\. (.*?)(?=\\n|$)", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text.substring(matcher1.end()));

        while (matcher.find()) {
            int stepNumber = Integer.parseInt(matcher.group(1));
            String description = matcher.group(2).trim();
            steps.add(new Step(stepNumber, description));
        }

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(steps);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String extractField(String text, String regex) {
        return extractField(text, regex, 0);
    }

    private static String extractField(String text, String regex, int flags) {
        Pattern pattern = Pattern.compile(regex, flags);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "";
    }

    private static boolean extractBooleanField(String text, String regex) {
        String value = extractField(text, regex);
        return "是".equalsIgnoreCase(value);
    }

    private static List<CookIngredients> parseIngredients(String ingredientsText) {
        List<CookIngredients> ingredients = new ArrayList<>();
        if (ingredientsText != null && !ingredientsText.isEmpty()) {
            String[] ingredientItems = ingredientsText.split("、");
            for (String item : ingredientItems) {
                String[] parts = item.trim().split(" ", 2);
                if (parts.length == 2) {
                    CookIngredients ingredient = new CookIngredients();
                    ingredient.setIngredientsName(parts[0].trim());
                    ingredient.setQuantity(parts[1].trim());
                    ingredients.add(ingredient);
                }
            }
        }
        return ingredients;
    }

    public static void main(String[] args) {
        String text = "首先需要说明的是，您提供的烹饪时间“1分钟”在实际烹饪中不太符合常理哦，大部分菜肴很难在1分钟内完成烹饪呢。以下为您重新整理一个合理的菜谱示例，以常见的“酸辣土豆丝”为例：\n" +
                "\n" +
                "\n" +
                "### 菜谱名称：酸辣土豆丝  \n" +
                "**描述**：经典家常菜，口感爽脆，酸辣开胃，搭配米饭堪称一绝。  \n" +
                "**图片URL**：https://img1.baidu.com/it/u=3323120201,157146060&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500  \n" +
                "**bilibili视频URL**：https://www.bilibili.com/video/BV1Ws411j7xw（示例链接，具体可搜索最新教程）  \n" +
                "**选择食材**：土豆 2个、洋葱 半个、干辣椒 5个、蒜 3瓣、香醋 2勺、生抽 1勺、盐 少许、食用油 适量  \n" +
                "**烹饪步骤**：  \n" +
                "1. 土豆去皮洗净，切成粗细均匀的丝，放入清水中浸泡10分钟去除淀粉；洋葱切丝，蒜切末，干辣椒剪成段。  \n" +
                "2. 锅中倒油烧热，放入蒜末、干辣椒段炒出香味，加入洋葱丝翻炒至变软。  \n" +
                "3. 捞出土豆丝沥干水分，放入锅中大火快速翻炒1-2分钟，加生抽、香醋、盐调味，翻炒均匀后即可出锅。  \n" +
                "**是否荤菜**：否  \n" +
                "**是否汤类**：否  \n" +
                "**烹饪时间（分钟）**：15  \n" +
                "**难度**：简单  \n" +
                "\n" +
                "\n" +
                "如果您有特定想做的菜名，可以告诉我，我会按照格式为您调整菜谱哦～";

        Recipes recipe = convertTextToRecipe(text);
        // 打印结果进行验证
        System.out.println(recipe);
    }
}