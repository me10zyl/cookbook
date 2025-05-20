import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Button, Tag, Divider, Spin, Empty, Checkbox, DatePicker, List } from 'antd';
import { ReloadOutlined,  ShoppingCartOutlined, PlayCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { Recipe, Ingredient } from '../types';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { CheckboxGroup } = Checkbox;

interface DailyRecipe extends Recipe {
  type: string;
}

interface ShoppingItem {
  ingredientsId: number;
  ingredientsName: string;
  quantity: string;
  recipeId: number;
  recipeName: string;
}

const DailyRecommendation: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [recommendations, setRecommendations] = useState<DailyRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<string[]>(['balanced']);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [showShoppingList, setShowShoppingList] = useState<boolean>(false);

  const preferenceOptions = [
    { label: '均衡饮食', value: 'balanced' },
    { label: '低脂', value: 'low_fat' },
    { label: '素食', value: 'vegetarian' },
    { label: '快速烹饪', value: 'quick' },
  ];

  // 模拟从API获取每日推荐菜谱
  const fetchRecommendations = (): void => {
    setLoading(true);
    // 这里应该是实际的API调用，根据日期和用户偏好获取推荐菜谱
    setTimeout(() => {
      // 根据用户偏好生成不同的推荐
      let mockRecommendations: DailyRecipe[] = [];
      
      // 默认推荐（均衡饮食）
      if (preferences.includes('balanced')) {
        mockRecommendations = [
          {
            recipeId: 1,
            recipeName: '红烧肉',
            description: '经典家常菜，肥而不腻，口感醇厚',
            imageUrl: 'https://via.placeholder.com/300x200?text=红烧肉',
            bilibiliUrl: 'https://www.bilibili.com/video/sample1',
            isMeat: 1,
            isSoup: 0,
            cookTime: 60,
            difficulty: '中等',
            type: '荤菜'
          },
          {
            recipeId: 3,
            recipeName: '紫菜蛋花汤',
            description: '营养丰富的家常汤品',
            imageUrl: 'https://via.placeholder.com/300x200?text=紫菜蛋花汤',
            bilibiliUrl: 'https://www.bilibili.com/video/sample3',
            isMeat: 0,
            isSoup: 1,
            cookTime: 20,
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipeId: 5,
            recipeName: '清炒时蔬',
            description: '健康爽口的素菜',
            imageUrl: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibiliUrl: 'https://www.bilibili.com/video/sample5',
            isMeat: 0,
            isSoup: 0,
            cookTime: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipeId: 6,
            recipeName: '米饭',
            description: '主食',
            imageUrl: 'https://via.placeholder.com/300x200?text=米饭',
            bilibiliUrl: 'https://www.bilibili.com/video/sample6',
            isMeat: 0,
            isSoup: 0,
            cookTime: 30,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 低脂推荐
      if (preferences.includes('low_fat')) {
        mockRecommendations = [
          {
            recipeId: 7,
            recipeName: '清蒸鲈鱼',
            description: '低脂健康的蛋白质来源',
            imageUrl: 'https://via.placeholder.com/300x200?text=清蒸鲈鱼',
            bilibiliUrl: 'https://www.bilibili.com/video/sample7',
            isMeat: 1,
            isSoup: 0,
            cookTime: 25,
            difficulty: '中等',
            type: '荤菜'
          },
          {
            recipeId: 3,
            recipeName: '紫菜蛋花汤',
            description: '营养丰富的家常汤品',
            imageUrl: 'https://via.placeholder.com/300x200?text=紫菜蛋花汤',
            bilibiliUrl: 'https://www.bilibili.com/video/sample3',
            isMeat: 0,
            isSoup: 1,
            cookTime: 20,
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipeId: 5,
            recipeName: '清炒时蔬',
            description: '健康爽口的素菜',
            imageUrl: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibiliUrl: 'https://www.bilibili.com/video/sample5',
            isMeat: 0,
            isSoup: 0,
            cookTime: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipeId: 8,
            recipeName: '糙米饭',
            description: '健康主食',
            imageUrl: 'https://via.placeholder.com/300x200?text=糙米饭',
            bilibiliUrl: 'https://www.bilibili.com/video/sample8',
            isMeat: 0,
            isSoup: 0,
            cookTime: 40,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 素食推荐
      if (preferences.includes('vegetarian')) {
        mockRecommendations = [
          {
            recipeId: 9,
            recipeName: '麻婆豆腐素食版',
            description: '无肉版麻婆豆腐，一样麻辣鲜香',
            imageUrl: 'https://via.placeholder.com/300x200?text=麻婆豆腐素食版',
            bilibiliUrl: 'https://www.bilibili.com/video/sample9',
            isMeat: 0,
            isSoup: 0,
            cookTime: 25,
            difficulty: '中等',
            type: '素菜'
          },
          {
            recipeId: 3,
            recipeName: '紫菜蛋花汤',
            description: '营养丰富的家常汤品',
            imageUrl: 'https://via.placeholder.com/300x200?text=紫菜蛋花汤',
            bilibiliUrl: 'https://www.bilibili.com/video/sample3',
            isMeat: 0,
            isSoup: 1,
            cookTime: 20,
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipeId: 5,
            recipeName: '清炒时蔬',
            description: '健康爽口的素菜',
            imageUrl: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibiliUrl: 'https://www.bilibili.com/video/sample5',
            isMeat: 0,
            isSoup: 0,
            cookTime: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipeId: 6,
            recipeName: '米饭',
            description: '主食',
            imageUrl: 'https://via.placeholder.com/300x200?text=米饭',
            bilibiliUrl: 'https://www.bilibili.com/video/sample6',
            isMeat: 0,
            isSoup: 0,
            cookTime: 30,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 快速烹饪推荐
      if (preferences.includes('quick')) {
        mockRecommendations = [
          {
            recipeId: 2,
            recipeName: '西红柿炒鸡蛋',
            description: '简单易做的家常菜，酸甜可口',
            imageUrl: 'https://via.placeholder.com/300x200?text=西红柿炒鸡蛋',
            bilibiliUrl: 'https://www.bilibili.com/video/sample2',
            isMeat: 1,
            isSoup: 0,
            cookTime: 15,
            difficulty: '简单',
            type: '荤菜'
          },
          {
            recipeId: 10,
            recipeName: '蒜蓉炒青菜',
            description: '快手素菜，清爽可口',
            imageUrl: 'https://via.placeholder.com/300x200?text=蒜蓉炒青菜',
            bilibiliUrl: 'https://www.bilibili.com/video/sample10',
            isMeat: 0,
            isSoup: 0,
            cookTime: 10,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipeId: 11,
            recipeName: '紫菜虾皮汤',
            description: '简单快手的营养汤品',
            imageUrl: 'https://via.placeholder.com/300x200?text=紫菜虾皮汤',
            bilibiliUrl: 'https://www.bilibili.com/video/sample11',
            isMeat: 1,
            isSoup: 1,
            cookTime: 15,
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipeId: 6,
            recipeName: '米饭',
            description: '主食',
            imageUrl: 'https://via.placeholder.com/300x200?text=米饭',
            bilibiliUrl: 'https://www.bilibili.com/video/sample6',
            isMeat: 0,
            isSoup: 0,
            cookTime: 30,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }

      setRecommendations(mockRecommendations);
      setLoading(false);
      setRefreshing(false);
      
      // 模拟生成购物清单
      const mockShoppingList: ShoppingItem[] = [];
      mockRecommendations.forEach(recipe => {
        // 这里应该是实际的API调用，获取每个菜谱所需的食材
        if (recipe.recipeId === 1) { // 红烧肉
          mockShoppingList.push(
            { ingredientsId: 1, ingredientsName: '五花肉', quantity: '500g', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 2, ingredientsName: '生抽', quantity: '2勺', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 3, ingredientsName: '老抽', quantity: '1勺', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 4, ingredientsName: '冰糖', quantity: '30g', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
          );
        } else if (recipe.recipeId === 2) { // 西红柿炒鸡蛋
          mockShoppingList.push(
            { ingredientsId: 5, ingredientsName: '鸡蛋', quantity: '3个', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 6, ingredientsName: '西红柿', quantity: '2个', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
          );
        } else if (recipe.recipeId === 3) { // 紫菜蛋花汤
          mockShoppingList.push(
            { ingredientsId: 7, ingredientsName: '紫菜', quantity: '10g', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 5, ingredientsName: '鸡蛋', quantity: '1个', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
          );
        } else {
          // 其他菜谱的默认食材
          mockShoppingList.push(
            { ingredientsId: 8, ingredientsName: '主料', quantity: '适量', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
            { ingredientsId: 9, ingredientsName: '调料', quantity: '适量', recipeId: recipe.recipeId, recipeName: recipe.recipeName },
          );
        }
      });
      
      setShoppingList(mockShoppingList);
    }, 1500);
  };

  // 初始加载和刷新推荐
  useEffect(() => {
    fetchRecommendations();
  }, [preferences]); // 当偏好变化时重新获取推荐

  // 处理日期变化
  const handleDateChange = (date: dayjs.Dayjs | null): void => {
    if (date) {
      setDate(date.toDate());
      setRefreshing(true);
      fetchRecommendations();
    }
  };

  // 处理偏好变化
  const handlePreferenceChange = (checkedValues: string[]): void => {
    setPreferences(checkedValues.length > 0 ? checkedValues : ['balanced']);
  };

  // 处理刷新推荐
  const handleRefresh = (): void => {
    setRefreshing(true);
    fetchRecommendations();
  };

  // 处理显示/隐藏购物清单
  const toggleShoppingList = (): void => {
    setShowShoppingList(!showShoppingList);
  };

  // 生成购物清单
  const generateShoppingList = (): void => {
    // 这里可以实现导出购物清单的功能，例如复制到剪贴板或导出文件
    const shoppingListText = shoppingList
      .map(item => `${item.ingredientsName} ${item.quantity} (${item.recipeName})`)
      .join('\n');
    
    // 简单实现：复制到剪贴板
    navigator.clipboard.writeText(shoppingListText)
      .then(() => {
        alert('购物清单已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动记录购物清单。');
      });
  };

  // 按菜谱类型分组推荐
  const groupedRecommendations = recommendations.reduce<Record<string, DailyRecipe[]>>((groups, recipe) => {
    const type = recipe.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(recipe);
    return groups;
  }, {});

  return (
    <div className="daily-recommendation-container">
      <Title level={2}>每日推荐菜谱</Title>
      <Paragraph>
        根据您的饮食偏好，为您推荐今日的菜谱组合。
      </Paragraph>

      <div className="preference-section" style={{ marginBottom: 30 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <DatePicker 
              value={dayjs(date)} 
              onChange={handleDateChange} 
              format="YYYY-MM-DD" 
              locale={locale}
              style={{ marginRight: 16 }}
            />
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh} 
              loading={refreshing}
            >
              刷新推荐
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <CheckboxGroup
              options={preferenceOptions}
              value={preferences}
              onChange={handlePreferenceChange}
            />
          </Col>
        </Row>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : recommendations.length > 0 ? (
        <div className="recommendations-result">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={3} style={{ margin: 0 }}>今日菜单</Title>
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              onClick={toggleShoppingList}
            >
              {showShoppingList ? '隐藏购物清单' : '查看购物清单'}
            </Button>
          </div>

          {showShoppingList && (
            <Card 
              title="购物清单" 
              style={{ marginBottom: 30 }}
              extra={
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={generateShoppingList}
                >
                  复制清单
                </Button>
              }
            >
              <List
                dataSource={shoppingList}
                renderItem={item => (
                  <List.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{item.ingredientsName} {item.quantity}</span>
                      <span style={{ color: '#999' }}>{item.recipeName}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          )}

          {Object.entries(groupedRecommendations).map(([type, recipes]) => (
            <div key={type} className="recipe-group" style={{ marginBottom: 30 }}>
              <Divider orientation="left">{type}</Divider>
              <Row gutter={[16, 16]}>
                {recipes.map(recipe => (
                  <Col xs={24} sm={12} md={6} key={recipe.recipeId}>
                    <Link to={`/recipe/${recipe.recipeId}`}>
                      <Card
                        hoverable
                        cover={<img alt={recipe.recipeName} src={recipe.imageUrl} />}
                      >
                        <Meta 
                          title={recipe.recipeName} 
                          description={recipe.description} 
                        />
                        <div style={{ marginTop: 16 }}>
                          <Tag color="blue">
                             {recipe.cookTime}分钟
                          </Tag>
                          <Tag color="purple">
                            难度：{recipe.difficulty}
                          </Tag>
                          <div style={{ marginTop: 8 }}>
                            <Button 
                              type="link" 
                              icon={<PlayCircleOutlined />} 
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(recipe.bilibiliUrl, '_blank');
                              }}
                              style={{ padding: 0 }}
                            >
                              观看视频
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="暂无推荐菜谱" />
      )}
    </div>
  );
};

export default DailyRecommendation;