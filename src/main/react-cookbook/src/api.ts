import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000
});

// 新增菜谱
export const createRecipe = async (recipe: any) => {
  return api.post('/admin/recipe/create', recipe);
};

// 删除原料
export const deleteIngredient = async (ingredientId: number) => {
  return api.delete(`/admin/ingredients/delete/${ingredientId}`);
};

// 更新菜谱
export const updateRecipe = async (recipeId: number, recipe: any) => {
  return api.post(`/admin/recipe/update/${recipeId}`, recipe);
};

// 删除菜谱
export const deleteRecipe = async (recipeId: number) => {
  return api.get(`/admin/recipe/delete/${recipeId}`);
};

// 获取所有原料
export const getAllIngredients = async () => {
  return api.get('/admin/ingredients/list');
};

// 新增原料
export const createIngredient = async (ingredient: any) => {
  return api.post('/admin/ingredients/create', ingredient);
};

// 更新原料
export const updateIngredient = async (ingredientId: number, ingredient: any) => {
  return api.put(`/admin/ingredients/update/${ingredientId}`, ingredient);
};

export const getAllRecipes = async () => {
  return api.get('/recipes/list');
};