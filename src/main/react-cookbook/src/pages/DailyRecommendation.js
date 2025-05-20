import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Button, Tag, Divider, Spin, Empty, Checkbox, DatePicker, List } from 'antd';
import { ReloadOutlined, CalendarOutlined, ShoppingCartOutlined, PlayCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { CheckboxGroup } = Checkbox;

const DailyRecommendation = () => {
  const [date, setDate] = useState(new Date());
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [preferences, setPreferences] = useState(['balanced']);
  const [shoppingList, setShoppingList] = useState([]);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const preferenceOptions = [
    { label: '均衡饮食', value: 'balanced' },
    { label: '低脂', value: 'low_fat' },
    { label: '素食', value: 'vegetarian' },
    { label: '快速烹饪', value: 'quick' },
  ];

  // 模拟从API获取每日推荐菜谱
  const fetchRecommendations = () => {
    setLoading(true);
    // 这里应该是实际的API调用，根据日期和用户偏好获取推荐菜谱
    setTimeout(() => {
      // 根据用户偏好生成不同的推荐
      let mockRecommendations = [];
      
      // 默认推荐（均衡饮食）
      if (preferences.includes('balanced')) {
        mockRecommendations = [
          {
            recipe_id: 1,
            recipe_name: '红烧肉',
            description: '经典家常菜，肥而不腻，口感醇厚',
            image_url: 'https://via.placeholder.com/300x200?text=红烧肉',
            bilibili_url: 'https://www.bilibili.com/video/sample1',
            is_meat: 1,
            is_soup: 0,
            cook_time: 60,
            difficulty: '中等',
            type: '荤菜'
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
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipe_id: 5,
            recipe_name: '清炒时蔬',
            description: '健康爽口的素菜',
            image_url: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibili_url: 'https://www.bilibili.com/video/sample5',
            is_meat: 0,
            is_soup: 0,
            cook_time: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipe_id: 6,
            recipe_name: '米饭',
            description: '主食',
            image_url: 'https://via.placeholder.com/300x200?text=米饭',
            bilibili_url: 'https://www.bilibili.com/video/sample6',
            is_meat: 0,
            is_soup: 0,
            cook_time: 30,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 低脂推荐
      if (preferences.includes('low_fat')) {
        mockRecommendations = [
          {
            recipe_id: 7,
            recipe_name: '清蒸鲈鱼',
            description: '低脂健康的蛋白质来源',
            image_url: 'https://via.placeholder.com/300x200?text=清蒸鲈鱼',
            bilibili_url: 'https://www.bilibili.com/video/sample7',
            is_meat: 1,
            is_soup: 0,
            cook_time: 25,
            difficulty: '中等',
            type: '荤菜'
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
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipe_id: 5,
            recipe_name: '清炒时蔬',
            description: '健康爽口的素菜',
            image_url: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibili_url: 'https://www.bilibili.com/video/sample5',
            is_meat: 0,
            is_soup: 0,
            cook_time: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipe_id: 8,
            recipe_name: '糙米饭',
            description: '健康主食',
            image_url: 'https://via.placeholder.com/300x200?text=糙米饭',
            bilibili_url: 'https://www.bilibili.com/video/sample8',
            is_meat: 0,
            is_soup: 0,
            cook_time: 40,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 素食推荐
      if (preferences.includes('vegetarian')) {
        mockRecommendations = [
          {
            recipe_id: 9,
            recipe_name: '麻婆豆腐素食版',
            description: '无肉版麻婆豆腐，一样麻辣鲜香',
            image_url: 'https://via.placeholder.com/300x200?text=麻婆豆腐素食版',
            bilibili_url: 'https://www.bilibili.com/video/sample9',
            is_meat: 0,
            is_soup: 0,
            cook_time: 25,
            difficulty: '中等',
            type: '素菜'
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
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipe_id: 5,
            recipe_name: '清炒时蔬',
            description: '健康爽口的素菜',
            image_url: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibili_url: 'https://www.bilibili.com/video/sample5',
            is_meat: 0,
            is_soup: 0,
            cook_time: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipe_id: 6,
            recipe_name: '米饭',
            description: '主食',
            image_url: 'https://via.placeholder.com/300x200?text=米饭',
            bilibili_url: 'https://www.bilibili.com/video/sample6',
            is_meat: 0,
            is_soup: 0,
            cook_time: 30,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 快速烹饪推荐
      if (preferences.includes('quick')) {
        mockRecommendations = [
          {
            recipe_id: 2,
            recipe_name: '西红柿炒鸡蛋',
            description: '简单易做的家常菜，酸甜可口',
            image_url: 'https://via.placeholder.com/300x200?text=西红柿炒鸡蛋',
            bilibili_url: 'https://www.bilibili.com/video/sample2',
            is_meat: 1,
            is_soup: 0,
            cook_time: 15,
            difficulty: '简单',
            type: '荤菜'
          },
          {
            recipe_id: 10,
            recipe_name: '紫菜虾皮汤',
            description: '快手营养汤',
            image_url: 'https://via.placeholder.com/300x200?text=紫菜虾皮汤',
            bilibili_url: 'https://www.bilibili.com/video/sample10',
            is_meat: 1,
            is_soup: 1,
            cook_time: 10,
            difficulty: '简单',
            type: '汤品'
          },
          {
            recipe_id: 5,
            recipe_name: '清炒时蔬',
            description: '健康爽口的素菜',
            image_url: 'https://via.placeholder.com/300x200?text=清炒时蔬',
            bilibili_url: 'https://www.bilibili.com/video/sample5',
            is_meat: 0,
            is_soup: 0,
            cook_time: 15,
            difficulty: '简单',
            type: '素菜'
          },
          {
            recipe_id: 11,
            recipe_name: '蛋炒饭',
            description: '快手主食',
            image_url: 'https://via.placeholder.com/300x200?text=蛋炒饭',
            bilibili_url: 'https://www.bilibili.com/video/sample11',
            is_meat: 1,
            is_soup: 0,
            cook_time: 10,
            difficulty: '简单',
            type: '主食'
          },
        ];
      }
      
      // 如果有多个偏好，随机选择一个偏好的推荐
      if (preferences.length > 1 && !preferences.includes('balanced')) {
        const randomIndex = Math.floor(Math.random() * preferences.length);
        const randomPreference = preferences[randomIndex];
        // 这里简化处理，实际应该根据随机选择的偏好生成对应的推荐
      }

      setRecommendations(mockRecommendations);
      
      // 生成购物清单
      const allIngredients = [];
      mockRecommendations.forEach(recipe => {
        if (recipe.recipe_id === 1) { // 红烧肉
          allIngredients.push({ name: '五花肉', quantity: '500g' });
          allIngredients.push({ name: '生抽', quantity: '2勺' });
          allIngredients.push({ name: '老抽', quantity: '1勺' });
          allIngredients.push({ name: '冰糖', quantity: '30g' });
        } else if (recipe.recipe_id === 2) { // 西红柿炒鸡蛋
          allIngredients.push({ name: '鸡蛋', quantity: '3个' });
          allIngredients.push({ name: '西红柿', quantity: '2个' });
        } else if (recipe.recipe_id === 3) { // 紫菜蛋花汤
          allIngredients.push({ name: '紫菜', quantity: '10g' });
          allIngredients.push({ name: '鸡蛋', quantity: '1个' });
        } else if (recipe.recipe_id === 5) { // 清炒时蔬
          allIngredients.push({ name: '青菜', quantity: '250g' });
          allIngredients.push({ name: '蒜', quantity: '2瓣' });
        } else {
          // 其他菜谱的默认食材
          allIngredients.push({ name: recipe.recipe_name + '所需食材', quantity: '适量' });
        }
        // 所有菜谱都需要的通用调料
        allIngredients.push({ name: '盐', quantity: '适量' });
      });
      
      // 合并相同食材
      const mergedIngredients = [];
      allIngredients.forEach(ingredient => {
        const existingIndex = mergedIngredients.findIndex(item => item.name === ingredient.name);
        if (existingIndex >= 0) {
          // 如果已存在，不做数量合并，避免复杂计算
          // 实际应用中应该根据单位进行合理合并
        } else {
          mergedIngredients.push(ingredient);
        }
      });
      
      setShoppingList(mergedIngredients);
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  // 初始加载和日期变化时获取推荐
  useEffect(() => {
    fetchRecommendations();
  }, [date]);

  // 处理日期变化
  const handleDateChange = (date) => {
    if (date) {
      setDate(date.toDate());
    }
  };

  // 处理偏好变化
  const handlePreferenceChange = (checkedValues) => {
    setPreferences(checkedValues);
  };

  // 刷新推荐
  const handleRefresh = () => {
    setRefreshing(true);
    fetchRecommendations();
  };

  // 生成购物清单
  const handleGenerateShoppingList = () => {
    setShowShoppingList(true);
  };

  // 复制购物清单到剪贴板
  const handleCopyShoppingList = () => {
    const text = shoppingList.map(item => `${item.name} ${item.quantity}`).join('\n');
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('购物清单已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动记录购物清单。');
      });
  };

  return (
    <div className="daily-recommendation-container">
      <Title level={2}>每日菜谱推荐</Title>
      <Paragraph>
        根据您的偏好，为您推荐今日的均衡饮食菜谱组合。
      </Paragraph>

      <div className="preference-section" style={{ marginBottom: 30 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <DatePicker 
              onChange={handleDateChange} 
              defaultValue={dayjs(date)}
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
            <div>饮食偏好：</div>
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
        <>
          <div className="recommendation-date" style={{ marginBottom: 20 }}>
            <Title level={4}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}推荐菜谱
            </Title>
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />}
              onClick={handleGenerateShoppingList}
              style={{ marginBottom: 16 }}
            >
              生成购物清单
            </Button>
          </div>

          <Row gutter={[16, 16]}>
            {recommendations.map(recipe => (
              <Col xs={24} sm={12} md={6} key={recipe.recipe_id}>
                <Card
                  hoverable
                  cover={<img alt={recipe.recipe_name} src={recipe.image_url} />}
                  actions={[
                    <Link to={`/recipe/${recipe.recipe_id}`} key="details">查看详情</Link>,
                    <Button 
                      type="link" 
                      icon={<PlayCircleOutlined />} 
                      onClick={() => window.open(recipe.bilibili_url, '_blank')}
                      key="video"
                    >
                      视频教程
                    </Button>,
                  ]}
                >
                  <Meta 
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{recipe.recipe_name}</span>
                        <Tag color="blue">{recipe.type}</Tag>
                      </div>
                    } 
                    description={
                      <div>
                        <p>{recipe.description}</p>
                        <p>
                          <Tag color="orange">烹饪时间：{recipe.cook_time}分钟</Tag>
                          <Tag color="green">难度：{recipe.difficulty}</Tag>
                        </p>
                      </div>
                    } 
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {showShoppingList && (
            <div className="shopping-list" style={{ marginTop: 30 }}>
              <Card 
                title="今日菜谱购物清单" 
                extra={<Button onClick={handleCopyShoppingList}>复制清单</Button>}
              >
                <List
                  dataSource={shoppingList}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          )}
        </>
      ) : (
        <Empty description="暂无推荐菜谱" />
      )}
    </div>
  );
};

export default DailyRecommendation;