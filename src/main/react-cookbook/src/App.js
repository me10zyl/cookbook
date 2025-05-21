import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Layout, Menu, message, Typography} from 'antd';
import { HomeOutlined, SearchOutlined, BookOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import './App.css';

// 导入页面组件
import RecipeDetail from './pages/RecipeDetail.tsx';
import IngredientSearch from './pages/IngredientSearch.tsx';
import RecipeIngredients from './pages/RecipeIngredients.tsx';
import DailyRecommendation from './pages/DailyRecommendation.tsx';
import Home from './pages/Home.tsx';
import RecipeManagement from './pages/RecipeManagement.tsx';
import {setMessageApi} from "./util/messageService.ts";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [messageApi, contextHolder] =
      message.useMessage();

  const getSelectedKey = () => {
    const pathname = window.location.pathname;
    return pathname;
  };

  // 在组件加载时设置 message api
  React.useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]);
  return (
    <Router>
      {contextHolder}
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">
            <Title level={3} style={{ color: 'white', margin: 0 }}>美食菜谱</Title>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[getSelectedKey()]}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="/ingredient-search" icon={<SearchOutlined />}>
              <Link to="/ingredient-search">食材匹配菜谱</Link>
            </Menu.Item>
            <Menu.Item key="/recipe-ingredients" icon={<BookOutlined />}>
              <Link to="/recipe-ingredients">菜谱反查食材</Link>
            </Menu.Item>
            <Menu.Item key="/daily-recommendation" icon={<CalendarOutlined />}>
              <Link to="/daily-recommendation">每日推荐</Link>
            </Menu.Item>
            <Menu.Item key="/management" icon={<SettingOutlined />}>
              <Link to="/management">管理中心</Link>
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
              <Route path="/management" element={<RecipeManagement />} />
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
