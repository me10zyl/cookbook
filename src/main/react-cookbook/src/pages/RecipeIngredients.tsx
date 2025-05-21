import React, { useState, useEffect } from 'react';
import {Typography, Input, Button, Card, List, Divider, Tag, Empty, Spin, Select} from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Recipe, Ingredient, GroupedIngredients } from '../types';
import { getAllRecipes, getIngredientsByRecipes } from '../api.ts';
import {interceptors} from "axios";

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface SimpleRecipe {
  recipeId: number;
  recipeName: string;
}

const RecipeIngredients: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // 从 API 获取菜谱列表
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await getAllRecipes();
        setRecipes(response.data.map((recipe: any) => ({
          recipeId: recipe.recipeId,
          recipeName: recipe.recipeName
        })));
      } catch (error) {
        console.error('获取菜谱列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // 处理搜索菜谱
  const handleSearch = async (): void => {
    if (!searchValue.trim()) return;

    setSearchLoading(true);
    try {
      const response = await getAllRecipes(searchValue);
      const filteredRecipes = response.data.map((recipe: any) => ({
        recipeId: recipe.recipeId,
        recipeName: recipe.recipeName
      }));
      if (filteredRecipes.length > 0) {
        setSelectedRecipeIds([filteredRecipes[0].recipeId]);
        await fetchIngredients([filteredRecipes[0].recipeId]);
      } else {
        setSelectedRecipeIds([]);
        setIngredients([]);
      }
    } catch (error) {
      console.error('搜索菜谱失败:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // 处理菜谱选择
  const handleRecipeSelect = async (values: number[]): Promise<void> => {
    setSelectedRecipeIds(values);
    await fetchIngredients(values);
  };

  // 获取食材信息
  const fetchIngredients = async (recipeIds: number[]): Promise<void> => {
    setLoading(true);
    try {
      if (recipeIds.length > 0) {
        const response = await getIngredientsByRecipes(recipeIds);
        setIngredients(response.data);
      } else {
        setIngredients([]);
      }
    } catch (error) {
      console.error('获取食材信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 根据食材类型进行分组
  const groupIngredients = (ingredients: Ingredient[]): GroupedIngredients => {
    const groups: GroupedIngredients = {
      main: ingredients.filter(item => item.isMain),
      meat: ingredients.filter(item => item.isMeat),
      flavour: ingredients.filter(item => item.isFlavour),
      other: ingredients.filter(item => !item.isMain && !item.isMeat && !item.isFlavour)
    };
    return groups;
  };

  // 生成购物清单
  const generateShoppingList = (): void => {
    const requiredIngredients = ingredients.filter(item => item.isRequired === 1);
    const shoppingList = requiredIngredients.map(item => `${item.ingredientsName} ${item.quantity}`).join('\n');

    navigator.clipboard.writeText(shoppingList)
      .then(() => {
        alert('购物清单已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动记录购物清单。');
      });
  };

  const groupedIngredients = groupIngredients(ingredients);
console.log(ingredients, groupedIngredients)
  return (
    <div className="recipe-ingredients-container">
      <Title level={2}>菜谱反查食材</Title>
      <Paragraph>
        输入或选择菜谱名称，查看制作所需的全部食材。支持多选菜谱。
      </Paragraph>

      <div className="search-section" style={{ marginBottom: 30 }}>
        <Search
          placeholder="输入菜谱名称"
          enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
          size="large"
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          loading={searchLoading}
          style={{ maxWidth: 500 }}
        />
      </div>

      <div className="recipe-list" style={{ marginBottom: 30 }}>
        <Divider orientation="left">热门菜谱</Divider>
        {loading ? (
          <Spin />
        ) : (
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择菜谱"
            value={selectedRecipeIds}
            onChange={handleRecipeSelect}
          >
            {recipes.map(recipe => (
              <Option key={recipe.recipeId} value={recipe.recipeId}>
                {recipe.recipeName}
              </Option>
            ))}
          </Select>
        )}
      </div>

      {selectedRecipeIds.length > 0 ? (
        <div className="ingredients-result">
          <Card 
            title={`${selectedRecipeIds.length === 1 ? recipes.find(r => r.recipeId === selectedRecipeIds[0])?.recipeName : '多个菜谱'}所需食材`}
            extra={
              <Button 
                type="primary" 
                icon={<ShoppingCartOutlined />}
                onClick={generateShoppingList}
                disabled={ingredients.length === 0}
              >
                生成购物清单
              </Button>
            }
            loading={loading}
          >
            {groupedIngredients.main.length > 0 && (
              <>
                <Divider orientation="left" plain>主料</Divider>
                <List
                  dataSource={groupedIngredients.main}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.ingredientsName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            
            {groupedIngredients.meat.length > 0 && (
              <>
                <Divider orientation="left" plain>荤料</Divider>
                <List
                  dataSource={groupedIngredients.meat}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.ingredientsName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            
            {groupedIngredients.flavour.length > 0 && (
              <>
                <Divider orientation="left" plain>调料</Divider>
                <List
                  dataSource={groupedIngredients.flavour}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.ingredientsName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            
            {groupedIngredients.other.length > 0 && (
              <>
                <Divider orientation="left" plain>其他</Divider>
                <List
                  dataSource={groupedIngredients.other}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.ingredientsName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
          </Card>
        </div>
      ) : (
        <Empty description="请选择或搜索菜谱" />
      )}
    </div>
  );
};

export default RecipeIngredients;