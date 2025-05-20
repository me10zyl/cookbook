import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Divider, Tag, List, Steps, Button, Row, Col, Card, Spin, Empty } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟从API获取菜谱详情数据
  useEffect(() => {
    // 这里应该是实际的API调用
    // 模拟数据加载
    setTimeout(() => {
      // 模拟菜谱数据
      const mockRecipe = {
        recipe_id: parseInt(id),
        recipe_name: '红烧肉',
        description: '红烧肉是一道色香味俱全的传统名菜，在我国各大菜系中都有自己特色的红烧肉。红烧肉的烹饪技术以砂锅为主，肥瘦相间，香甜松软，入口即化。',
        steps: '1. 猪肉切块，冷水下锅焯水去血水和杂质\n2. 锅中放油，下冰糖小火炒至融化呈棕色\n3. 放入肉块翻炒至肉块均匀上色\n4. 加入料酒、生抽、老抽、八角、桂皮等调料\n5. 加入没过肉的开水，大火烧开后转小火慢炖1小时\n6. 调入盐和糖，收汁即可',
        image_url: 'https://via.placeholder.com/600x400?text=红烧肉',
        bilibili_url: 'https://www.bilibili.com/video/sample1',
        is_meat: 1,
        is_soup: 0,
        cook_time: 90,
        difficulty: '中等'
      };

      // 模拟食材数据
      const mockIngredients = [
        { ingredient_id: 1, ingredients_name: '五花肉', quantity: '500g', is_required: 1, is_meat: 1, is_main: 1, is_flavour: 0 },
        { ingredient_id: 2, ingredients_name: '生抽', quantity: '2勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 3, ingredients_name: '老抽', quantity: '1勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 4, ingredients_name: '冰糖', quantity: '30g', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 5, ingredients_name: '八角', quantity: '2个', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 6, ingredients_name: '桂皮', quantity: '1小块', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 7, ingredients_name: '料酒', quantity: '1勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
        { ingredient_id: 8, ingredients_name: '盐', quantity: '适量', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
      ];

      setRecipe(mockRecipe);
      setIngredients(mockIngredients);
      setLoading(false);
    }, 1000);
  }, [id]);

  // 将步骤文本转换为数组
  const getStepsArray = (stepsText) => {
    if (!stepsText) return [];
    return stepsText.split('\n').map(step => step.trim()).filter(step => step);
  };

  // 根据食材类型进行分组
  const groupIngredients = (ingredients) => {
    const groups = {
      main: ingredients.filter(item => item.is_main === 1),
      meat: ingredients.filter(item => item.is_meat === 1 && item.is_main === 0),
      flavour: ingredients.filter(item => item.is_flavour === 1),
      other: ingredients.filter(item => item.is_main === 0 && item.is_meat === 0 && item.is_flavour === 0)
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

  const stepsArray = getStepsArray(recipe.steps);
  const groupedIngredients = groupIngredients(ingredients);

  return (
    <div className="recipe-detail-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Title level={2}>{recipe.recipe_name}</Title>
          
          <div className="recipe-tags">
            <Tag color={recipe.is_meat ? 'red' : 'green'}>
              {recipe.is_meat ? '荤菜' : '素菜'}
            </Tag>
            <Tag color={recipe.is_soup ? 'blue' : 'orange'}>
              {recipe.is_soup ? '汤品' : '炒菜'}
            </Tag>
            <Tag color="purple">
              <ClockCircleOutlined /> {recipe.cook_time}分钟
            </Tag>
            <Tag color="cyan">
              <FireOutlined /> 难度：{recipe.difficulty}
            </Tag>
          </div>
          
          <Paragraph style={{ marginTop: 16 }}>
            {recipe.description}
          </Paragraph>
          
          <div className="recipe-image" style={{ marginTop: 20, marginBottom: 20 }}>
            <img 
              src={recipe.image_url} 
              alt={recipe.recipe_name} 
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
            />
          </div>
          
          <Divider orientation="left">烹饪步骤</Divider>
          
          <Steps 
            direction="vertical" 
            current={-1} 
            items={stepsArray.map((step, index) => ({
              title: `步骤 ${index + 1}`,
              description: step.replace(/^\d+\.\s*/, '')
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
                      <span>{item.ingredients_name}</span>
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
                      <span>{item.ingredients_name}</span>
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
                      <span>{item.ingredients_name}</span>
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
                      <span>{item.ingredients_name}</span>
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
            onClick={() => window.open(recipe.bilibili_url, '_blank')}
          >
            观看视频教程
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetail;