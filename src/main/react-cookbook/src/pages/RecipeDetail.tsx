import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Divider, Tag, List, Steps, Button, Row, Col, Card, Spin, Empty } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import { Recipe, Ingredient, GroupedIngredients } from '../types';
import { getRecipeDetails } from '../api.ts';

const { Title, Paragraph } = Typography;


interface RecipeDetailProps {
  recipe?: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe: propRecipe }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(propRecipe || null);
  const [loading, setLoading] = useState<boolean>(propRecipe ? false : true);
  const [groupedIngredients , setGroupedIngredients] = useState<GroupedIngredients>({
    main: [],
    meat: [],
    flavour: [],
    other: []
  });
  const [stepsArray, setStepsArray] = useState<string[]>([]);

  // 从API获取菜谱详情数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (propRecipe.recipeId) {
          const recipeResponse = await getRecipeDetails(propRecipe.recipeId);
          const recipe = recipeResponse.data;
          setRecipe(recipe);
          console.log('recipe:', recipe);
          const stepsArray = getStepsArray(recipe.steps);
          const groupedIngredients = doGroupIngredients(recipe.ingredients);
          setStepsArray(stepsArray);
          setGroupedIngredients(groupedIngredients);
          console.log('groupedIngredients:', groupedIngredients);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propRecipe]);

  // 将步骤文本转换为数组
  const getStepsArray = (stepsText?: string): string[] => {
    if (!stepsText) return [];
    return JSON.parse(stepsText);
  };

  // 根据食材类型进行分组
  const doGroupIngredients = (ingredients: Ingredient[]): GroupedIngredients => {
    const groups: GroupedIngredients = {
      main: ingredients.filter(item => item.isMain),
      meat: ingredients.filter(item => item.isMeat),
      flavour: ingredients.filter(item => item.isFlavour),
      other: ingredients.filter(item => !item.isMain && !item.isMeat && !item.isFlavour)
    };
    return groups;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!recipe) {
    return <Empty description="未找到菜谱" />;
  }



  return (
    <div className="recipe-detail-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Title level={2}>{recipe.recipeName}</Title>
          
          <div className="recipe-tags">
            <Tag color={recipe.isMeat ? 'red' : 'green'}>
              {recipe.isMeat ? '荤菜' : '素菜'}
            </Tag>
            <Tag color={recipe.isSoup ? 'blue' : 'orange'}>
              {recipe.isSoup ? '汤品' : '炒菜'}
            </Tag>
            <Tag color="purple">
              <ClockCircleOutlined /> {recipe.cookTime}分钟
            </Tag>
            <Tag color="cyan">
              <FireOutlined /> 难度：{recipe.difficulty}
            </Tag>
          </div>
          
          <Paragraph style={{ marginTop: 16 }}>
            {recipe.description}
          </Paragraph>

          {recipe.imageUrl ? <div className="recipe-image" style={{ marginTop: 20, marginBottom: 20 }}>
            <img 
              src={recipe.imageUrl} 
              alt={recipe.recipeName} 
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
            />
          </div> :  <></>}
          
          <Divider orientation="left">烹饪步骤</Divider>
          
          <Steps 
            direction="vertical" 
            current={-1} 
            items={stepsArray.map((step, index) => ({
              title: `步骤 ${step.stepNumber}`,
              description: step ? step.description.replace(/^\d+\.\s*/, '') : ''
            }))}
          />
        </Col>
        
        <Col xs={24} md={8}>
          <Card title="食材清单" bordered={false}>
            {groupedIngredients.main.length > 0 && (
              <>
                <Divider orientation="left" plain>主料</Divider>
                <List
                  dataSource={groupedIngredients.main}
                  renderItem={item => (
                    <List.Item>
                      <span>{item.ingredientsName}</span>
                      <span>{item.quantity}</span>
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
                      <span>{item.ingredientsName}</span>
                      <span>{item.quantity}</span>
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
                      <span>{item.ingredientsName}</span>
                      <span>{item.quantity}</span>
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
                      <span>{item.ingredientsName}</span>
                      <span>{item.quantity}</span>
                    </List.Item>
                  )}
                />
              </>
            )}
          </Card>
          
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />} 
            size="large" 
            block 
            style={{ marginTop: 20 }}
            onClick={() => window.open(recipe.bilibiliUrl, '_blank')}
          >
            观看视频教程
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetail;