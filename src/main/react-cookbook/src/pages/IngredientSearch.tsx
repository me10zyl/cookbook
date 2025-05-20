import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Select, Card, Row, Col, Button, Tag, Divider, Empty, Spin, Switch } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Ingredient, Recipe } from '../types';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

interface MatchedRecipe extends Recipe {
  matchedIngredients: string[];
  missingIngredients: string[];
}

const IngredientSearch: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [matchedRecipes, setMatchedRecipes] = useState<MatchedRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [onlyMeat, setOnlyMeat] = useState<boolean>(false);
  const [onlyVegetarian, setOnlyVegetarian] = useState<boolean>(false);

  // 模拟从API获取所有食材数据
  useEffect(() => {
    // 这里应该是实际的API调用
    setTimeout(() => {
      const mockIngredients: Ingredient[] = [
        { ingredientsId: 1, ingredientsName: '五花肉', isMeat: 1, isMain: 1, isFlavour: 0 },
        { ingredientsId: 2, ingredientsName: '鸡蛋', isMeat: 1, isMain: 1, isFlavour: 0 },
        { ingredientsId: 3, ingredientsName: '西红柿', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 4, ingredientsName: '豆腐', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 5, ingredientsName: '青椒', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 6, ingredientsName: '土豆', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 7, ingredientsName: '洋葱', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 8, ingredientsName: '胡萝卜', isMeat: 0, isMain: 1, isFlavour: 0 },
        { ingredientsId: 9, ingredientsName: '生抽', isMeat: 0, isMain: 0, isFlavour: 1 },
        { ingredientsId: 10, ingredientsName: '老抽', isMeat: 0, isMain: 0, isFlavour: 1 },
        { ingredientsId: 11, ingredientsName: '盐', isMeat: 0, isMain: 0, isFlavour: 1 },
        { ingredientsId: 12, ingredientsName: '糖', isMeat: 0, isMain: 0, isFlavour: 1 },
      ];
      setIngredients(mockIngredients);
      setLoading(false);
    }, 1000);
  }, []);

  // 处理食材选择变化
  const handleIngredientChange = (selectedIds: number[]): void => {
    const selected = ingredients.filter(item => selectedIds.includes(item.ingredientsId));
    setSelectedIngredients(selected);
  };

  // 处理荤素筛选变化
  const handleMeatFilterChange = (checked: boolean): void => {
    setOnlyMeat(checked);
    if (checked) {
      setOnlyVegetarian(false);
    }
  };

  const handleVegetarianFilterChange = (checked: boolean): void => {
    setOnlyVegetarian(checked);
    if (checked) {
      setOnlyMeat(false);
    }
  };

  // 搜索匹配菜谱
  const searchRecipes = (): void => {
    if (selectedIngredients.length === 0) {
      return;
    }

    setSearchLoading(true);
    // 这里应该是实际的API调用，根据选择的食材和筛选条件查询匹配的菜谱
    setTimeout(() => {
      // 模拟匹配结果
      const mockMatchedRecipes: MatchedRecipe[] = [
        {
          recipeId: 1,
          recipeName: '红烧肉',
          description: '经典家常菜，肥而不腻，口感醇厚',
          imageUrl: 'https://via.placeholder.com/300x200?text=红烧肉',
          isMeat: 1,
          isSoup: 0,
          matchedIngredients: ['五花肉'],
          missingIngredients: ['生抽', '老抽', '冰糖', '八角', '桂皮']
        },
        {
          recipeId: 2,
          recipeName: '西红柿炒鸡蛋',
          description: '简单易做的家常菜，酸甜可口',
          imageUrl: 'https://via.placeholder.com/300x200?text=西红柿炒鸡蛋',
          isMeat: 1,
          isSoup: 0,
          matchedIngredients: ['西红柿', '鸡蛋'],
          missingIngredients: ['盐', '糖', '葱花']
        },
        {
          recipeId: 4,
          recipeName: '麻婆豆腐',
          description: '川菜经典，麻辣鲜香',
          imageUrl: 'https://via.placeholder.com/300x200?text=麻婆豆腐',
          isMeat: 1,
          isSoup: 0,
          matchedIngredients: ['豆腐'],
          missingIngredients: ['牛肉末', '豆瓣酱', '花椒', '辣椒']
        },
      ];

      // 根据筛选条件过滤结果
      let filteredRecipes = mockMatchedRecipes;
      if (onlyMeat) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.isMeat === 1);
      }
      if (onlyVegetarian) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.isMeat === 0);
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
                  key={item.ingredientsId} 
                  value={item.ingredientsId}
                  label={item.ingredientsName}
                >
                  <div>
                    {item.ingredientsName}
                    {item.isMeat === 1 && <Tag color="red" style={{ marginLeft: 8 }}>荤</Tag>}
                    {item.isMeat === 0 && item.isMain === 1 && <Tag color="green" style={{ marginLeft: 8 }}>素</Tag>}
                    {item.isFlavour === 1 && <Tag color="blue" style={{ marginLeft: 8 }}>调料</Tag>}
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
            {/* <span style={{ marginRight: 8 }}>
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
            </span> */}
          </Col>
        </Row>
      </div>

      {selectedIngredients.length > 0 && (
        <div className="selected-ingredients" style={{ marginBottom: 20 }}>
          <Divider orientation="left">已选食材</Divider>
          <div>
            {selectedIngredients.map(item => (
              <Tag key={item.ingredientsId} color="blue" style={{ marginBottom: 8 }}>
                {item.ingredientsName}
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
                <Col xs={24} sm={12} md={8} key={recipe.recipeId}>
                  <Link to={`/recipe/${recipe.recipeId}`}>
                    <Card
                      hoverable
                      cover={recipe.imageUrl ? '' : <img alt={recipe.recipeName} src={recipe.imageUrl} />}
                    >
                      <Meta 
                        title={recipe.recipeName} 
                        description={recipe.description} 
                      />
                      <div style={{ marginTop: 16 }}>
                        <div style={{ marginBottom: 8 }}>
                          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                          <span>已有食材：</span>
                          {recipe.matchedIngredients.map((item, index) => (
                            <Tag key={index} color="success">{item}</Tag>
                          ))}
                        </div>
                        <div>
                          <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                          <span>缺少食材：</span>
                          {recipe.missingIngredients.map((item, index) => (
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