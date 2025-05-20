import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Card, List, Divider, Tag, Empty, Spin } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Recipe, Ingredient, GroupedIngredients } from '../types';

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface SimpleRecipe {
  recipeId: number;
  recipeName: string;
}

const RecipeIngredients: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SimpleRecipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // 模拟从API获取菜谱列表
  useEffect(() => {
    setLoading(true);
    // 这里应该是实际的API调用
    setTimeout(() => {
      const mockRecipes: SimpleRecipe[] = [
        { recipeId: 1, recipeName: '红烧肉' },
        { recipeId: 2, recipeName: '西红柿炒鸡蛋' },
        { recipeId: 3, recipeName: '紫菜蛋花汤' },
        { recipeId: 4, recipeName: '麻婆豆腐' },
        { recipeId: 5, recipeName: '糖醋排骨' },
        { recipeId: 6, recipeName: '鱼香肉丝' },
        { recipeId: 7, recipeName: '宫保鸡丁' },
        { recipeId: 8, recipeName: '清蒸鲈鱼' },
      ];
      setRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // 处理搜索菜谱
  const handleSearch = (): void => {
    if (!searchValue.trim()) return;
    
    setSearchLoading(true);
    // 模拟搜索结果
    setTimeout(() => {
      const filteredRecipes = recipes.filter(recipe => 
        recipe.recipeName.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      if (filteredRecipes.length > 0) {
        // 自动选择第一个匹配的菜谱
        handleRecipeSelect(filteredRecipes[0].recipeId);
      } else {
        setSelectedRecipe(null);
        setIngredients([]);
      }
      
      setSearchLoading(false);
    }, 500);
  };

  // 处理菜谱选择
  const handleRecipeSelect = (recipeId: number): void => {
    setLoading(true);
    // 这里应该是实际的API调用，根据菜谱ID获取食材列表
    setTimeout(() => {
      const selectedRecipe = recipes.find(recipe => recipe.recipeId === recipeId);
      setSelectedRecipe(selectedRecipe || null);

      // 模拟食材数据
      let mockIngredients: Ingredient[] = [];
      
      if (recipeId === 1) { // 红烧肉
        mockIngredients = [
          { ingredientsId: 1, ingredientsName: '五花肉', quantity: '500g', isRequired: 1, isMeat: 1, isMain: 1, isFlavour: 0 },
          { ingredientsId: 2, ingredientsName: '生抽', quantity: '2勺', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 3, ingredientsName: '老抽', quantity: '1勺', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 4, ingredientsName: '冰糖', quantity: '30g', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 5, ingredientsName: '八角', quantity: '2个', isRequired: 0, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 6, ingredientsName: '桂皮', quantity: '1小块', isRequired: 0, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 7, ingredientsName: '料酒', quantity: '1勺', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 8, ingredientsName: '盐', quantity: '适量', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
        ];
      } else if (recipeId === 2) { // 西红柿炒鸡蛋
        mockIngredients = [
          { ingredientsId: 2, ingredientsName: '鸡蛋', quantity: '3个', isRequired: 1, isMeat: 1, isMain: 1, isFlavour: 0 },
          { ingredientsId: 3, ingredientsName: '西红柿', quantity: '2个', isRequired: 1, isMeat: 0, isMain: 1, isFlavour: 0 },
          { ingredientsId: 11, ingredientsName: '盐', quantity: '适量', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 12, ingredientsName: '糖', quantity: '少许', isRequired: 0, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 13, ingredientsName: '葱花', quantity: '适量', isRequired: 0, isMeat: 0, isMain: 0, isFlavour: 1 },
        ];
      } else { // 其他菜谱的默认食材
        mockIngredients = [
          { ingredientsId: 1, ingredientsName: '主料', quantity: '适量', isRequired: 1, isMeat: 1, isMain: 1, isFlavour: 0 },
          { ingredientsId: 11, ingredientsName: '盐', quantity: '适量', isRequired: 1, isMeat: 0, isMain: 0, isFlavour: 1 },
          { ingredientsId: 12, ingredientsName: '糖', quantity: '少许', isRequired: 0, isMeat: 0, isMain: 0, isFlavour: 1 },
        ];
      }

      setIngredients(mockIngredients);
      setLoading(false);
    }, 1000);
  };

  // 根据食材类型进行分组
  const groupIngredients = (ingredients: Ingredient[]): GroupedIngredients => {
    const groups: GroupedIngredients = {
      main: ingredients.filter(item => item.isMain === 1),
      meat: ingredients.filter(item => item.isMeat === 1 && item.isMain === 0),
      flavour: ingredients.filter(item => item.isFlavour === 1),
      other: ingredients.filter(item => item.isMain === 0 && item.isMeat === 0 && item.isFlavour === 0)
    };
    return groups;
  };

  // 生成购物清单
  const generateShoppingList = (): void => {
    // 这里可以实现导出购物清单的功能，例如复制到剪贴板或导出文件
    const requiredIngredients = ingredients.filter(item => item.isRequired === 1);
    const shoppingList = requiredIngredients.map(item => `${item.ingredientsName} ${item.quantity}`).join('\n');
    
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
                key={recipe.recipeId} 
                color={selectedRecipe && selectedRecipe.recipeId === recipe.recipeId ? 'blue' : 'default'}
                style={{ fontSize: 14, padding: '4px 8px', cursor: 'pointer', marginBottom: 8 }}
                onClick={() => handleRecipeSelect(recipe.recipeId)}
              >
                {recipe.recipeName}
              </Tag>
            ))}
          </div>
        )}
      </div>

      {selectedRecipe ? (
        <div className="ingredients-result">
          <Card 
            title={`${selectedRecipe.recipeName}所需食材`}
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
                        <span>{item.ingredientsName}</span>
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
                        <span>{item.ingredientsName}</span>
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
                        <span>{item.ingredientsName}</span>
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
                        <span>{item.ingredientsName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
          </Card>
        </div>
      ) : (
        <Empty description="请选择或搜索菜谱" />
      )}
    </div>
  );
};

export default RecipeIngredients;