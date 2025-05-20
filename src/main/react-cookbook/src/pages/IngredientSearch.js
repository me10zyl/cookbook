import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Select, Card, Row, Col, Button, Tag, Divider, Empty, Spin, Switch } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

const IngredientSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [onlyMeat, setOnlyMeat] = useState(false);
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);

  // 模拟从API获取所有食材数据
  useEffect(() => {
    // 这里应该是实际的API调用
    setTimeout(() => {
      const mockIngredients = [
        { ingredients_id: 1, ingredients_name: '五花肉', is_meat: 1, is_main: 1, is_flavour: 0 },
        { ingredients_id: 2, ingredients_name: '鸡蛋', is_meat: 1, is_main: 1, is_flavour: 0 },
        { ingredients_id: 3, ingredients_name: '西红柿', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 4, ingredients_name: '豆腐', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 5, ingredients_name: '青椒', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 6, ingredients_name: '土豆', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 7, ingredients_name: '洋葱', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 8, ingredients_name: '胡萝卜', is_meat: 0, is_main: 1, is_flavour: 0 },
        { ingredients_id: 9, ingredients_name: '生抽', is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredients_id: 10, ingredients_name: '老抽', is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredients_id: 11, ingredients_name: '盐', is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredients_id: 12, ingredients_name: '糖', is_meat: 0, is_main: 0, is_flavour: 1 },
      ];
      setIngredients(mockIngredients);
      setLoading(false);
    }, 1000);
  }, []);

  // 处理食材选择变化
  const handleIngredientChange = (selectedIds) => {
    const selected = ingredients.filter(item => selectedIds.includes(item.ingredients_id));
    setSelectedIngredients(selected);
  };

  // 处理荤素筛选变化
  const handleMeatFilterChange = (checked) => {
    setOnlyMeat(checked);
    if (checked) {
      setOnlyVegetarian(false);
    }
  };

  const handleVegetarianFilterChange = (checked) => {
    setOnlyVegetarian(checked);
    if (checked) {
      setOnlyMeat(false);
    }
  };

  // 搜索匹配菜谱
  const searchRecipes = () => {
    if (selectedIngredients.length === 0) {
      return;
    }

    setSearchLoading(true);
    // 这里应该是实际的API调用，根据选择的食材和筛选条件查询匹配的菜谱
    setTimeout(() => {
      // 模拟匹配结果
      const mockMatchedRecipes = [
        {
          recipe_id: 1,
          recipe_name: '红烧肉',
          description: '经典家常菜，肥而不腻，口感醇厚',
          image_url: 'https://via.placeholder.com/300x200?text=红烧肉',
          is_meat: 1,
          is_soup: 0,
          matched_ingredients: ['五花肉'],
          missing_ingredients: ['生抽', '老抽', '冰糖', '八角', '桂皮']
        },
        {
          recipe_id: 2,
          recipe_name: '西红柿炒鸡蛋',
          description: '简单易做的家常菜，酸甜可口',
          image_url: 'https://via.placeholder.com/300x200?text=西红柿炒鸡蛋',
          is_meat: 1,
          is_soup: 0,
          matched_ingredients: ['西红柿', '鸡蛋'],
          missing_ingredients: ['盐', '糖', '葱花']
        },
        {
          recipe_id: 4,
          recipe_name: '麻婆豆腐',
          description: '川菜经典，麻辣鲜香',
          image_url: 'https://via.placeholder.com/300x200?text=麻婆豆腐',
          is_meat: 1,
          is_soup: 0,
          matched_ingredients: ['豆腐'],
          missing_ingredients: ['牛肉末', '豆瓣酱', '花椒', '辣椒']
        },
      ];

      // 根据筛选条件过滤结果
      let filteredRecipes = mockMatchedRecipes;
      if (onlyMeat) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.is_meat === 1);
      }
      if (onlyVegetarian) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.is_meat === 0);
      }

      setMatchedRecipes(filteredRecipes);
      setSearchLoading(false);
    }, 1500);
  };

  return (
    <div className="ingredient-search-container">
      <Title level={2}>食材匹配菜谱</Title>
      <Paragraph>
        选择您家中已有的食材，我们将为您推荐可以烹饪的菜谱。
      </Paragraph>

      <div className="search-section" style={{ marginBottom: 30 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择您家中已有的食材"
              onChange={handleIngredientChange}
              loading={loading}
              optionFilterProp="children"
              optionLabelProp="label"
            >
              {ingredients.map(item => (
                <Option 
                  key={item.ingredients_id} 
                  value={item.ingredients_id}
                  label={item.ingredients_name}
                >
                  <div>
                    {item.ingredients_name}
                    {item.is_meat === 1 && <Tag color="red" style={{ marginLeft: 8 }}>荤</Tag>}
                    {item.is_meat === 0 && item.is_main === 1 && <Tag color="green" style={{ marginLeft: 8 }}>素</Tag>}
                    {item.is_flavour === 1 && <Tag color="blue" style={{ marginLeft: 8 }}>调料</Tag>}
                  </div>
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={searchRecipes} 
              loading={searchLoading}
              disabled={selectedIngredients.length === 0}
              style={{ marginRight: 16 }}
            >
              查找菜谱
            </Button>
            <span style={{ marginRight: 8 }}>
              <Switch 
                checkedChildren="只看荤菜" 
                unCheckedChildren="荤菜" 
                checked={onlyMeat} 
                onChange={handleMeatFilterChange} 
              />
            </span>
            <span>
              <Switch 
                checkedChildren="只看素菜" 
                unCheckedChildren="素菜" 
                checked={onlyVegetarian} 
                onChange={handleVegetarianFilterChange} 
              />
            </span>
          </Col>
        </Row>
      </div>

      {selectedIngredients.length > 0 && (
        <div className="selected-ingredients" style={{ marginBottom: 20 }}>
          <Divider orientation="left">已选食材</Divider>
          <div>
            {selectedIngredients.map(item => (
              <Tag key={item.ingredients_id} color="blue" style={{ marginBottom: 8 }}>
                {item.ingredients_name}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <div className="recipe-results">
        {searchLoading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
          </div>
        ) : matchedRecipes.length > 0 ? (
          <>
            <Divider orientation="left">匹配菜谱</Divider>
            <Row gutter={[16, 16]}>
              {matchedRecipes.map(recipe => (
                <Col xs={24} sm={12} md={8} key={recipe.recipe_id}>
                  <Link to={`/recipe/${recipe.recipe_id}`}>
                    <Card
                      hoverable
                      cover={<img alt={recipe.recipe_name} src={recipe.image_url} />}
                    >
                      <Meta 
                        title={recipe.recipe_name} 
                        description={recipe.description} 
                      />
                      <div style={{ marginTop: 16 }}>
                        <div style={{ marginBottom: 8 }}>
                          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                          <span>已有食材：</span>
                          {recipe.matched_ingredients.map((item, index) => (
                            <Tag key={index} color="success">{item}</Tag>
                          ))}
                        </div>
                        <div>
                          <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                          <span>缺少食材：</span>
                          {recipe.missing_ingredients.map((item, index) => (
                            <Tag key={index} color="error">{item}</Tag>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        ) : selectedIngredients.length > 0 && (
          <Empty description="未找到匹配的菜谱，请尝试选择其他食材" />
        )}
      </div>
    </div>
  );
};

export default IngredientSearch;