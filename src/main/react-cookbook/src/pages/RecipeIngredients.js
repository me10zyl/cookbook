import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Card, List, Divider, Tag, Empty, Spin } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const RecipeIngredients = () => {
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // 模拟从API获取菜谱列表
  useEffect(() => {
    setLoading(true);
    // 这里应该是实际的API调用
    setTimeout(() => {
      const mockRecipes = [
        { recipe_id: 1, recipe_name: '红烧肉' },
        { recipe_id: 2, recipe_name: '西红柿炒鸡蛋' },
        { recipe_id: 3, recipe_name: '紫菜蛋花汤' },
        { recipe_id: 4, recipe_name: '麻婆豆腐' },
        { recipe_id: 5, recipe_name: '糖醋排骨' },
        { recipe_id: 6, recipe_name: '鱼香肉丝' },
        { recipe_id: 7, recipe_name: '宫保鸡丁' },
        { recipe_id: 8, recipe_name: '清蒸鲈鱼' },
      ];
      setRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  // 处理搜索输入变化
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // 处理搜索菜谱
  const handleSearch = () => {
    if (!searchValue.trim()) return;
    
    setSearchLoading(true);
    // 模拟搜索结果
    setTimeout(() => {
      const filteredRecipes = recipes.filter(recipe => 
        recipe.recipe_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      if (filteredRecipes.length > 0) {
        // 自动选择第一个匹配的菜谱
        handleRecipeSelect(filteredRecipes[0].recipe_id);
      } else {
        setSelectedRecipe(null);
        setIngredients([]);
      }
      
      setSearchLoading(false);
    }, 500);
  };

  // 处理菜谱选择
  const handleRecipeSelect = (recipeId) => {
    setLoading(true);
    // 这里应该是实际的API调用，根据菜谱ID获取食材列表
    setTimeout(() => {
      const selectedRecipe = recipes.find(recipe => recipe.recipe_id === recipeId);
      setSelectedRecipe(selectedRecipe);

      // 模拟食材数据
      let mockIngredients = [];
      
      if (recipeId === 1) { // 红烧肉
        mockIngredients = [
          { ingredient_id: 1, ingredients_name: '五花肉', quantity: '500g', is_required: 1, is_meat: 1, is_main: 1, is_flavour: 0 },
          { ingredient_id: 2, ingredients_name: '生抽', quantity: '2勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 3, ingredients_name: '老抽', quantity: '1勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 4, ingredients_name: '冰糖', quantity: '30g', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 5, ingredients_name: '八角', quantity: '2个', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 6, ingredients_name: '桂皮', quantity: '1小块', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 7, ingredients_name: '料酒', quantity: '1勺', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 8, ingredients_name: '盐', quantity: '适量', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
        ];
      } else if (recipeId === 2) { // 西红柿炒鸡蛋
        mockIngredients = [
          { ingredient_id: 2, ingredients_name: '鸡蛋', quantity: '3个', is_required: 1, is_meat: 1, is_main: 1, is_flavour: 0 },
          { ingredient_id: 3, ingredients_name: '西红柿', quantity: '2个', is_required: 1, is_meat: 0, is_main: 1, is_flavour: 0 },
          { ingredient_id: 11, ingredients_name: '盐', quantity: '适量', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 12, ingredients_name: '糖', quantity: '少许', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 13, ingredients_name: '葱花', quantity: '适量', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
        ];
      } else { // 其他菜谱的默认食材
        mockIngredients = [
          { ingredient_id: 1, ingredients_name: '主料', quantity: '适量', is_required: 1, is_meat: 1, is_main: 1, is_flavour: 0 },
          { ingredient_id: 11, ingredients_name: '盐', quantity: '适量', is_required: 1, is_meat: 0, is_main: 0, is_flavour: 1 },
          { ingredient_id: 12, ingredients_name: '糖', quantity: '少许', is_required: 0, is_meat: 0, is_main: 0, is_flavour: 1 },
        ];
      }

      setIngredients(mockIngredients);
      setLoading(false);
    }, 1000);
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

  // 生成购物清单
  const generateShoppingList = () => {
    // 这里可以实现导出购物清单的功能，例如复制到剪贴板或导出文件
    const requiredIngredients = ingredients.filter(item => item.is_required === 1);
    const shoppingList = requiredIngredients.map(item => `${item.ingredients_name} ${item.quantity}`).join('\n');
    
    // 简单实现：复制到剪贴板
    navigator.clipboard.writeText(shoppingList)
      .then(() => {
        alert('购物清单已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动记录购物清单。');
      });
  };

  const groupedIngredients = groupIngredients(ingredients);

  return (
    <div className="recipe-ingredients-container">
      <Title level={2}>菜谱反查食材</Title>
      <Paragraph>
        输入或选择菜谱名称，查看制作所需的全部食材。
      </Paragraph>

      <div className="search-section" style={{ marginBottom: 30 }}>
        <Search
          placeholder="输入菜谱名称"
          enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
          size="large"
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          loading={searchLoading}
          style={{ maxWidth: 500 }}
        />
      </div>

      <div className="recipe-list" style={{ marginBottom: 30 }}>
        <Divider orientation="left">热门菜谱</Divider>
        {loading ? (
          <Spin />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recipes.map(recipe => (
              <Tag 
                key={recipe.recipe_id} 
                color={selectedRecipe && selectedRecipe.recipe_id === recipe.recipe_id ? 'blue' : 'default'}
                style={{ fontSize: 14, padding: '4px 8px', cursor: 'pointer', marginBottom: 8 }}
                onClick={() => handleRecipeSelect(recipe.recipe_id)}
              >
                {recipe.recipe_name}
              </Tag>
            ))}
          </div>
        )}
      </div>

      {selectedRecipe ? (
        <div className="ingredients-result">
          <Card 
            title={`${selectedRecipe.recipe_name}所需食材`}
            extra={
              <Button 
                type="primary" 
                icon={<ShoppingCartOutlined />}
                onClick={generateShoppingList}
                disabled={ingredients.length === 0}
              >
                生成购物清单
              </Button>
            }
            loading={loading}
          >
            {groupedIngredients.main.length > 0 && (
              <>
                <Divider orientation="left" plain>主料</Divider>
                <List
                  dataSource={groupedIngredients.main}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>
                          {item.ingredients_name}
                          {item.is_required === 0 && <Tag color="orange" style={{ marginLeft: 8 }}>可选</Tag>}
                        </span>
                        <span>{item.quantity}</span>
                      </div>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>
                          {item.ingredients_name}
                          {item.is_required === 0 && <Tag color="orange" style={{ marginLeft: 8 }}>可选</Tag>}
                        </span>
                        <span>{item.quantity}</span>
                      </div>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>
                          {item.ingredients_name}
                          {item.is_required === 0 && <Tag color="orange" style={{ marginLeft: 8 }}>可选</Tag>}
                        </span>
                        <span>{item.quantity}</span>
                      </div>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>
                          {item.ingredients_name}
                          {item.is_required === 0 && <Tag color="orange" style={{ marginLeft: 8 }}>可选</Tag>}
                        </span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}

            <Divider orientation="left" plain>替代食材建议</Divider>
            <Paragraph>
              <ul>
                <li>如果没有五花肉，可以使用其他肥瘦相间的猪肉部位。</li>
                <li>没有新鲜蔬菜时，可以考虑使用冷冻蔬菜代替。</li>
                <li>调料可根据个人口味适当增减。</li>
              </ul>
            </Paragraph>
          </Card>
        </div>
      ) : (
        <Empty description="请选择或搜索菜谱以查看所需食材" />
      )}
    </div>
  );
};

export default RecipeIngredients;