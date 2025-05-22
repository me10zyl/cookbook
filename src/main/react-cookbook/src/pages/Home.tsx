import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Input, Card, Typography, Spin, Empty, Menu, Layout, Divider, Button } from 'antd';
import { RightOutlined, BookOutlined, FireOutlined, CoffeeOutlined, BulbOutlined, ClockCircleOutlined } from '@ant-design/icons';
import RecipeDetail from './RecipeDetail.tsx';
import { Recipe } from '../types';
import { getAllRecipes } from '../api.ts';
import {showError} from "../util/messageService.ts";

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Sider, Content } = Layout;
const { Search } = Input;

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetRecipe = (recipes: Recipe[]): void => {
    setRecipes(recipes);
    if (recipes.length > 0) {
      setSelectedRecipe(recipes[0]);
    }
  };

  // 从API获取菜谱数据
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipes();
        handleSetRecipe(response.data);
      } catch (error) {
        console.error('获取菜谱数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // 根据URL参数选择菜谱
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const recipeId = parseInt(pathParts[pathParts.length - 1]);
    if (!isNaN(recipeId)) {
      const recipe = recipes.find(r => r.recipeId === recipeId);
      if (recipe) {
        setSelectedRecipe(recipe);
      }
    }
  }, [location.pathname, recipes]);

  // 处理菜谱选择
  const handleRecipeSelect = (recipeId: number): void => {
    const recipe = recipes.find(r => r.recipeId === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      // 导航到对应的菜谱页面
      navigate(`/recipe/${recipeId}`);
    }
  };

  // 处理搜索
  const handleSearch = async (value: string) => {
    setSearchKeyword(value);
    setLoading(true);
    try {
      const response = await getAllRecipes(value);
      handleSetRecipe(response.data);
    } catch (error) {
      showError('搜索失败:' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="home-container" style={{ background: '#fff', minHeight: '80vh' }}>
      <Title level={2}>欢迎使用美食菜谱</Title>
      <Paragraph>
        探索美味菜谱，发现烹饪乐趣。您可以通过食材匹配菜谱、查询所需食材，或者获取每日推荐。
      </Paragraph>
      <Layout style={{ background: '#fff', marginTop: 20 }}>
        <Sider width={250} style={{ background: '#fff', borderRight: '1px solid #f0f0f0', overflow: 'auto' }}>
          <div style={{ padding: '10px 0' }}>
            <Search
                placeholder="搜索菜谱"
                allowClear
                enterButton="搜索"
                size="middle"
                onSearch={handleSearch}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{ marginBottom: 20, paddingRight: 10  }}
            />
            <Title level={4} style={{ paddingLeft: 16 }}>所有菜品</Title>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Spin size="small" />
              </div>
            ) : recipes.length > 0 ? (
              <Menu
                mode="inline"
                selectedKeys={[selectedRecipe ? selectedRecipe.recipeId.toString() : '']}
                style={{ height: '100%' }}
                items={recipes.map(recipe => ({
                  key: recipe.recipeId.toString(),
                  label: recipe.recipeName,
                  icon: recipe.isMeat === 1 ? <FireOutlined /> : <CoffeeOutlined />
                }))}
                onClick={({ key }) => handleRecipeSelect(parseInt(key))}
              />
            ) : (
              <Empty description="暂无菜谱数据" style={{ padding: '20px 0' }} />
            )}
          </div>
        </Sider>
        
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Title level={3}>菜品详情</Title>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Spin size="large" />
            </div>
          ) : selectedRecipe ? (
            <RecipeDetail recipe={selectedRecipe} />
          ) : (
            <Empty description="请从左侧选择一个菜谱" />
          )}

         {/* <div style={{ marginTop: 30, textAlign: 'right' }}>
            <Link to="/ingredient-search">
              按食材查找菜谱 <RightOutlined />
            </Link>
          </div>*/}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;