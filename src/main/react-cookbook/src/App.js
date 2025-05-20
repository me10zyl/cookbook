import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, SearchOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import './App.css';

// 导入页面组件
import RecipeDetail from './pages/RecipeDetail';
import IngredientSearch from './pages/IngredientSearch';
import RecipeIngredients from './pages/RecipeIngredients';
import DailyRecommendation from './pages/DailyRecommendation';
import Home from './pages/Home';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">
            <Title level={3} style={{ color: 'white', margin: 0 }}>美食菜谱</Title>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />}>
              <Link to="/ingredient-search">食材匹配菜谱</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BookOutlined />}>
              <Link to="/recipe-ingredients">菜谱反查食材</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<CalendarOutlined />}>
              <Link to="/daily-recommendation">每日推荐</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 20 }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/ingredient-search" element={<IngredientSearch />} />
              <Route path="/recipe-ingredients" element={<RecipeIngredients />} />
              <Route path="/daily-recommendation" element={<DailyRecommendation />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          美食菜谱 ©{new Date().getFullYear()} 版权所有
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
