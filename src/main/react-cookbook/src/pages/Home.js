import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Typography, Spin, Empty, Menu, Layout, Divider, Button } from 'antd';
import { RightOutlined, BookOutlined, FireOutlined, CoffeeOutlined, BulbOutlined, ClockCircleOutlined } from '@ant-design/icons';
import RecipeDetail from './RecipeDetail';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Sider, Content } = Layout;

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 模拟从API获取菜谱数据
  useEffect(() => {
    // 这里应该是实际的API调用
    // 模拟数据加载
    setTimeout(() => {
      // 模拟菜谱数据
      const mockRecipes = [
        {
          recipe_id: 1,
          recipe_name: '红烧肉',
          description: '经典家常菜，肥而不腻，口感醇厚',
          image_url: 'https://via.placeholder.com/300x200?text=红烧肉',
          bilibili_url: 'https://www.bilibili.com/video/sample1',
          is_meat: 1,
          is_soup: 0,
          cook_time: 60,
          difficulty: '中等'
        },
        {
          recipe_id: 2,
          recipe_name: '西红柿炒鸡蛋',
          description: '简单易做的家常菜，酸甜可口',
          image_url: 'https://via.placeholder.com/300x200?text=西红柿炒鸡蛋',
          bilibili_url: 'https://www.bilibili.com/video/sample2',
          is_meat: 1,
          is_soup: 0,
          cook_time: 15,
          difficulty: '简单'
        },
        {
          recipe_id: 3,
          recipe_name: '紫菜蛋花汤',
          description: '营养丰富的家常汤品',
          image_url: 'https://via.placeholder.com/300x200?text=紫菜蛋花汤',
          bilibili_url: 'https://www.bilibili.com/video/sample3',
          is_meat: 0,
          is_soup: 1,
          cook_time: 20,
          difficulty: '简单'
        },
        {
          recipe_id: 4,
          recipe_name: '麻婆豆腐',
          description: '川菜经典，麻辣鲜香',
          image_url: 'https://via.placeholder.com/300x200?text=麻婆豆腐',
          bilibili_url: 'https://www.bilibili.com/video/sample4',
          is_meat: 1,
          is_soup: 0,
          cook_time: 30,
          difficulty: '中等'
        },
      ];
      setRecipes(mockRecipes);
      // 默认选中第一个菜谱
      if (mockRecipes.length > 0) {
        setSelectedRecipe(mockRecipes[0]);
      }
      setLoading(false);
    }, 1000);
  }, []);

  // 处理菜谱选择
  const handleRecipeSelect = (recipeId) => {
    const recipe = recipes.find(r => r.recipe_id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
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
            <Title level={4} style={{ paddingLeft: 16 }}>所有菜品</Title>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Spin size="small" />
              </div>
            ) : recipes.length > 0 ? (
              <Menu
                mode="inline"
                selectedKeys={[selectedRecipe ? selectedRecipe.recipe_id.toString() : '']}
                style={{ height: '100%' }}
                items={recipes.map(recipe => ({
                  key: recipe.recipe_id.toString(),
                  label: recipe.recipe_name,
                  icon: recipe.is_meat === 1 ? <FireOutlined /> : <CoffeeOutlined />
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
            <RecipeDetail />
          ) : (
            <Empty description="请从左侧选择一个菜谱" />
          )}

          <div style={{ marginTop: 30, textAlign: 'right' }}>
            <Link to="/ingredient-search">
              按食材查找菜谱 <RightOutlined />
            </Link>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;