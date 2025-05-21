import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Select, Card, Row, Col, Button, Tag, Divider, Empty, Spin, Switch } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Ingredient, Recipe } from '../types';
import { getAllIngredients, matchRecipes } from '../api.ts';

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

  // 从 API 获取所有食材数据
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await getAllIngredients();
        setIngredients(response.data);
      } catch (error) {
        console.error('获取食材数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
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
  const searchRecipes = async (): Promise<void> => {
    if (selectedIngredients.length === 0) {
      return;
    }

    setSearchLoading(true);
    try {
      const ingredientIds = selectedIngredients.map(item => item.ingredientsId);
      const isMeat = onlyMeat ? true : onlyVegetarian ? false : undefined;
      const response = await matchRecipes(ingredientIds, isMeat);
      const matchedRecipes: MatchedRecipe[] = response.data.map((recipe: Recipe) => ({
        ...recipe,
        matchedIngredients: recipe.matchedIngredients,
        missingIngredients:recipe.missingIngredients
      }));

      setMatchedRecipes(matchedRecipes);
    } catch (error) {
      console.error('搜索菜谱失败:', error);
      setMatchedRecipes([]);
    } finally {
      setSearchLoading(false);
    }
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
                    {!item.isFlavour && item.isMeat  && <Tag color="red" style={{ marginLeft: 8 }}>荤</Tag>}
                    {!item.isFlavour && !item.isMeat  && <Tag color="green" style={{ marginLeft: 8 }}>素</Tag>}
                    {item.isFlavour && <Tag color="blue" style={{ marginLeft: 8 }}>调料</Tag>}
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
            {/*<span style={{ marginRight: 8 }}>*/}
            {/*  <Switch*/}
            {/*    checkedChildren="只看荤菜" */}
            {/*    unCheckedChildren="荤菜" */}
            {/*    checked={onlyMeat} */}
            {/*    onChange={handleMeatFilterChange} */}
            {/*  />*/}
            {/*</span>*/}
            {/*<span>*/}
            {/*  <Switch */}
            {/*    checkedChildren="只看素菜" */}
            {/*    unCheckedChildren="素菜" */}
            {/*    checked={onlyVegetarian} */}
            {/*    onChange={handleVegetarianFilterChange} */}
            {/*  />*/}
            {/*</span>*/}
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
                      cover={recipe.imageUrl ? <img alt={recipe.recipeName} src={recipe.imageUrl} /> : null}
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