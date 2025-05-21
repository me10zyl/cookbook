// 公共类型定义文件

// 食材接口定义
export interface Ingredient {
  ingredientsId: number;
  ingredientsName: string;
  isMeat: boolean;
  isMain: boolean;
  isFlavour: boolean;
  quantity?: string;
  isRequired?: boolean;
  defaultQuantity: string;
}

// 菜谱接口定义
export interface SelectedIngredient extends Ingredient{
  ingredientsId: number;
  quantity: string;
}

export interface CookingStep {
  stepNumber: number;
  description: string;
}

export interface Recipe {
  recipeId: number;
  recipeName: string;
  description: string;
  imageUrl: string;
  bilibiliUrl?: string;
  isMeat: number;
  isSoup: number;
  cookTime?: number;
  difficulty?: string;
  steps?: string;
  ingredients?: SelectedIngredient[];
  formattedSteps?: CookingStep[];
  matchedIngredients?: string[];
  missingIngredients?: string[];
}

// 分组食材接口
export interface GroupedIngredients {
  main: Ingredient[];
  meat: Ingredient[];
  flavour: Ingredient[];
  other: Ingredient[];
}