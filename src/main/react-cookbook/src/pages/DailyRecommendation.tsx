import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Button, Tag, Divider, Spin, Empty, Checkbox,Radio, DatePicker, List } from 'antd';
import { ReloadOutlined,  ShoppingCartOutlined, PlayCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { DailyRecipe, DayRecommendation, Ingredient } from '../types';
import { getDailyRecommendations } from '../api.ts';
import copyText from "../util/clipboard.ts";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

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
  const [preferences, setPreferences] = useState<string>('balanced');
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [showShoppingList, setShowShoppingList] = useState<boolean>(false);

  const preferenceOptions = [
    { label: '均衡饮食', value: 'balanced' },
    { label: '素食', value: 'vegetarian' },
    { label: '快速烹饪', value: 'quick' },
  ];

  // 从 API 获取每日推荐菜谱
  const fetchRecommendations = async (): Promise<void> => {
    setLoading(true);
    try {
      const preferenceMap: Record<string, string> = {
        'balanced': '均衡',
        'vegetarian': '素食',
        'quick': '快速烹饪'
      };
      const preference = preferences ? preferenceMap[preferences] : '均衡';
      const response = await getDailyRecommendations(preference);
      const dayRecommendation: DayRecommendation = response.data;
      setRecommendations(dayRecommendation.recipes);
      // 生成购物清单
      const shoppingListItems: ShoppingItem[] = dayRecommendation.allIngredients.map(ingredient => ({
        ingredientsId: ingredient.ingredientsId,
        ingredientsName: ingredient.ingredientsName,
        quantity: ingredient.quantity,
        // 这里假设没有 recipeId 和 recipeName 关联，可根据实际情况调整
        recipeId: 0,
        recipeName: ''
      }));
      setShoppingList(shoppingListItems);
    } catch (error) {
      console.error('获取每日推荐失败:', error);
      setRecommendations([]);
      setShoppingList([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
  const handlePreferenceChange = (checkedValues: string): void => {
    setPreferences(checkedValues.target.value);
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
    copyText(shoppingListText)
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
          {/*  <DatePicker
              value={dayjs(date)} 
              onChange={handleDateChange} 
              format="YYYY-MM-DD" 
              locale={locale}
              style={{ marginRight: 16 }}
            />*/}
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh} 
              loading={refreshing}
            >
              刷新推荐
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Radio.Group
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
                        cover={recipe.imageUrl && <img alt={recipe.recipeName} src={recipe.imageUrl} />}
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