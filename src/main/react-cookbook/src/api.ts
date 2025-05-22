import axios from 'axios';
import {showError} from "./util/messageService.ts";

// 创建axios实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});


// 添加响应拦截器
api.interceptors.response.use(
    // 响应成功时，直接返回响应数据中的 data 字段
    (response) => {
      if (response.data) {
        if (response.data.success) {
          return response.data;
        }else{
           //Toast错误消息
          if (response.data.message) {
            console.error('发生服务器错误', response.data.message)
            showError(response.data.message);
          }
          throw new Error(response.data.message);
        }
      }
      throw new Error(response.data.message);
    },
    // 响应失败时，返回错误信息
    (error) => {
      let errorMessage = '请求发生错误，请稍后重试';
      if (error.response) {
        // 请求已发出，但服务器响应状态码不在 2xx 范围内
        errorMessage = `请求失败，状态码: ${error.response.status}，错误信息: ${error.response.data?.message || '未知错误'}`;
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        errorMessage = '没有收到服务器响应，请检查网络连接';
      } else {
        // 在设置请求时发生了错误
        errorMessage = `请求配置出错: ${error.message}`;
      }
      showError(errorMessage);
      return Promise.reject(error);
    }
);

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

// 获取所有菜谱
export const getAllRecipes = async (name?: string) => {
  const params = name ? { name } : {};
  return api.get('/recipes/list', { params });
};

//热门菜谱
export const getHotRecipes = async () => {
  return api.get('/recipes/getHotRecipes');
}

// 菜谱展示页面
export const getRecipeDetails = async (recipeId: number) => {
  return api.get(`/recipes/${recipeId}`);
};

// 食材匹配菜谱页面
export const matchRecipes = async (ingredientIds: number[], isMeat?: boolean) => {
  return api.post('/recipes/matchRecipes', ingredientIds, { params: { isMeat } });
};


// 多选菜谱反查食材
export const getIngredientsByRecipes = async (recipeIds: number[]) => {
  return api.post('/recipes/allIngredients', recipeIds);
};



// 每日随机菜谱推荐页面
export const getDailyRecommendations = async (preference?: string) => {
  const params = preference ? { preference } : {};
  return api.get('/recipes/daily-recommendations', { params });
};