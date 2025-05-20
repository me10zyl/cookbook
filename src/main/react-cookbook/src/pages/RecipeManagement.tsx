import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Modal, Form, Input, Select, InputNumber, Upload, message, Popconfirm, Switch, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Recipe, Ingredient } from '../types';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const RecipeManagement: React.FC = () => {
  // 食谱管理状态
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeModalVisible, setRecipeModalVisible] = useState(false);
  const [recipeForm] = Form.useForm();
  const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null);
  const [recipeLoading, setRecipeLoading] = useState(false);

  // 食材管理状态
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [ingredientForm] = Form.useForm();
  const [editingIngredientId, setEditingIngredientId] = useState<number | null>(null);
  const [ingredientLoading, setIngredientLoading] = useState(false);

  // 模拟从API获取数据
  useEffect(() => {
    // 这里应该是实际的API调用
    // 模拟数据加载
    setRecipeLoading(true);
    setTimeout(() => {
      // 模拟菜谱数据
      const mockRecipes: Recipe[] = [
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
          steps: '1. 准备食材\n2. 热锅冷油\n3. 炒制食材\n4. 加入调料\n5. 焖煮收汁'
        },
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
          steps: '1. 准备食材\n2. 热锅冷油\n3. 炒制食材\n4. 加入调料\n5. 出锅装盘'
        },
      ];
      setRecipes(mockRecipes);
      setRecipeLoading(false);

      // 模拟食材数据
      setIngredientLoading(true);
      const mockIngredients: Ingredient[] = [
        {
          ingredientsId: 1,
          ingredientsName: '猪肉',
          isMeat: 1,
          isMain: 1,
          isFlavour: 0,
          quantity: '500g'
        },
        {
          ingredientsId: 2,
          ingredientsName: '西红柿',
          isMeat: 0,
          isMain: 1,
          isFlavour: 0,
          quantity: '2个'
        },
        {
          ingredientsId: 3,
          ingredientsName: '鸡蛋',
          isMeat: 1,
          isMain: 1,
          isFlavour: 0,
          quantity: '3个'
        },
        {
          ingredientsId: 4,
          ingredientsName: '盐',
          isMeat: 0,
          isMain: 0,
          isFlavour: 1,
          quantity: '适量'
        },
      ];
      setIngredients(mockIngredients);
      setIngredientLoading(false);
    }, 1000);
  }, []);

  // 食谱相关操作
  const handleAddRecipe = () => {
    setEditingRecipeId(null);
    recipeForm.resetFields();
    setRecipeModalVisible(true);
  };

  const handleEditRecipe = (record: Recipe) => {
    setEditingRecipeId(record.recipeId);
    recipeForm.setFieldsValue({
      recipeName: record.recipeName,
      description: record.description,
      imageUrl: record.imageUrl,
      bilibiliUrl: record.bilibiliUrl,
      isMeat: record.isMeat,
      isSoup: record.isSoup,
      cookTime: record.cookTime,
      difficulty: record.difficulty,
      steps: record.steps
    });
    setRecipeModalVisible(true);
  };

  const handleDeleteRecipe = (recipeId: number) => {
    // 这里应该是实际的API调用
    // 模拟删除操作
    setRecipes(recipes.filter(recipe => recipe.recipeId !== recipeId));
    message.success('删除成功');
  };

  const handleRecipeFormSubmit = () => {
    recipeForm.validateFields().then(values => {
      // 这里应该是实际的API调用
      // 模拟提交操作
      if (editingRecipeId === null) {
        // 新增
        const newRecipe: Recipe = {
          ...values,
          recipeId: Math.max(...recipes.map(r => r.recipeId), 0) + 1
        };
        setRecipes([...recipes, newRecipe]);
        message.success('添加成功');
      } else {
        // 编辑
        const updatedRecipes = recipes.map(recipe => {
          if (recipe.recipeId === editingRecipeId) {
            return { ...recipe, ...values };
          }
          return recipe;
        });
        setRecipes(updatedRecipes);
        message.success('更新成功');
      }
      setRecipeModalVisible(false);
    });
  };

  // 食材相关操作
  const handleAddIngredient = () => {
    setEditingIngredientId(null);
    ingredientForm.resetFields();
    setIngredientModalVisible(true);
  };

  const handleEditIngredient = (record: Ingredient) => {
    setEditingIngredientId(record.ingredientsId);
    ingredientForm.setFieldsValue({
      ingredientsName: record.ingredientsName,
      isMeat: record.isMeat,
      isMain: record.isMain,
      isFlavour: record.isFlavour,
      quantity: record.quantity
    });
    setIngredientModalVisible(true);
  };

  const handleDeleteIngredient = (ingredientId: number) => {
    // 这里应该是实际的API调用
    // 模拟删除操作
    setIngredients(ingredients.filter(ingredient => ingredient.ingredientsId !== ingredientId));
    message.success('删除成功');
  };

  const handleIngredientFormSubmit = () => {
    ingredientForm.validateFields().then(values => {
      // 这里应该是实际的API调用
      // 模拟提交操作
      if (editingIngredientId === null) {
        // 新增
        const newIngredient: Ingredient = {
          ...values,
          ingredientsId: Math.max(...ingredients.map(i => i.ingredientsId), 0) + 1
        };
        setIngredients([...ingredients, newIngredient]);
        message.success('添加成功');
      } else {
        // 编辑
        const updatedIngredients = ingredients.map(ingredient => {
          if (ingredient.ingredientsId === editingIngredientId) {
            return { ...ingredient, ...values };
          }
          return ingredient;
        });
        setIngredients(updatedIngredients);
        message.success('更新成功');
      }
      setIngredientModalVisible(false);
    });
  };

  // 食谱表格列定义
  const recipeColumns = [
    {
      title: 'ID',
      dataIndex: 'recipeId',
      key: 'recipeId',
    },
    {
      title: '菜谱名称',
      dataIndex: 'recipeName',
      key: 'recipeName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '是否荤菜',
      dataIndex: 'isMeat',
      key: 'isMeat',
      render: (isMeat: number) => isMeat === 1 ? '是' : '否',
    },
    {
      title: '是否汤类',
      dataIndex: 'isSoup',
      key: 'isSoup',
      render: (isSoup: number) => isSoup === 1 ? '是' : '否',
    },
    {
      title: '烹饪时间',
      dataIndex: 'cookTime',
      key: 'cookTime',
      render: (cookTime?: number) => cookTime ? `${cookTime}分钟` : '-',
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Recipe) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditRecipe(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个菜谱吗？"
            onConfirm={() => handleDeleteRecipe(record.recipeId)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 食材表格列定义
  const ingredientColumns = [
    {
      title: 'ID',
      dataIndex: 'ingredientsId',
      key: 'ingredientsId',
    },
    {
      title: '食材名称',
      dataIndex: 'ingredientsName',
      key: 'ingredientsName',
    },
    {
      title: '是否荤类',
      dataIndex: 'isMeat',
      key: 'isMeat',
      render: (isMeat: number) => isMeat === 1 ? '是' : '否',
    },
    {
      title: '是否主料',
      dataIndex: 'isMain',
      key: 'isMain',
      render: (isMain: number) => isMain === 1 ? '是' : '否',
    },
    {
      title: '是否调料',
      dataIndex: 'isFlavour',
      key: 'isFlavour',
      render: (isFlavour: number) => isFlavour === 1 ? '是' : '否',
    },
    {
      title: '默认用量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Ingredient) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditIngredient(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个食材吗？"
            onConfirm={() => handleDeleteIngredient(record.ingredientsId)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="recipe-management-container">
      <Title level={2}>菜谱与食材管理</Title>
      <Paragraph>
        在这里您可以管理菜谱和食材信息，包括添加、编辑和删除操作。
      </Paragraph>

      <Tabs defaultActiveKey="1">
        <TabPane tab="菜谱管理" key="1">
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddRecipe}
            >
              添加菜谱
            </Button>
          </div>
          <Table 
            columns={recipeColumns} 
            dataSource={recipes} 
            rowKey="recipeId"
            loading={recipeLoading}
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title={editingRecipeId === null ? '添加菜谱' : '编辑菜谱'}
            visible={recipeModalVisible}
            onCancel={() => setRecipeModalVisible(false)}
            onOk={handleRecipeFormSubmit}
            width={700}
          >
            <Form
              form={recipeForm}
              layout="vertical"
            >
              <Form.Item
                name="recipeName"
                label="菜谱名称"
                rules={[{ required: true, message: '请输入菜谱名称' }]}
              >
                <Input placeholder="请输入菜谱名称" />
              </Form.Item>

              <Form.Item
                name="description"
                label="描述"
                rules={[{ required: true, message: '请输入菜谱描述' }]}
              >
                <Input.TextArea rows={3} placeholder="请输入菜谱描述" />
              </Form.Item>

              <Form.Item
                name="imageUrl"
                label="图片URL"
                rules={[{ required: true, message: '请输入图片URL' }]}
              >
                <Input placeholder="请输入图片URL" />
              </Form.Item>

              <Form.Item
                name="bilibiliUrl"
                label="视频URL"
              >
                <Input placeholder="请输入视频URL（可选）" />
              </Form.Item>

              <Form.Item
                name="steps"
                label="烹饪步骤"
                rules={[{ required: true, message: '请输入烹饪步骤' }]}
              >
                <Input.TextArea rows={5} placeholder="请输入烹饪步骤，每步一行" />
              </Form.Item>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item
                  name="isMeat"
                  label="是否荤菜"
                  rules={[{ required: true, message: '请选择是否荤菜' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={0}>否</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="isSoup"
                  label="是否汤类"
                  rules={[{ required: true, message: '请选择是否汤类' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={0}>否</Option>
                  </Select>
                </Form.Item>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item
                  name="cookTime"
                  label="烹饪时间（分钟）"
                  rules={[{ required: true, message: '请输入烹饪时间' }]}
                  style={{ flex: 1 }}
                >
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入烹饪时间" />
                </Form.Item>

                <Form.Item
                  name="difficulty"
                  label="难度"
                  rules={[{ required: true, message: '请选择难度' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value="简单">简单</Option>
                    <Option value="中等">中等</Option>
                    <Option value="困难">困难</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="食材管理" key="2">
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddIngredient}
            >
              添加食材
            </Button>
          </div>
          <Table 
            columns={ingredientColumns} 
            dataSource={ingredients} 
            rowKey="ingredientsId"
            loading={ingredientLoading}
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title={editingIngredientId === null ? '添加食材' : '编辑食材'}
            visible={ingredientModalVisible}
            onCancel={() => setIngredientModalVisible(false)}
            onOk={handleIngredientFormSubmit}
            width={600}
          >
            <Form
              form={ingredientForm}
              layout="vertical"
            >
              <Form.Item
                name="ingredientsName"
                label="食材名称"
                rules={[{ required: true, message: '请输入食材名称' }]}
              >
                <Input placeholder="请输入食材名称" />
              </Form.Item>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item
                  name="isMeat"
                  label="是否荤类"
                  rules={[{ required: true, message: '请选择是否荤类' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={0}>否</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="isMain"
                  label="是否主料"
                  rules={[{ required: true, message: '请选择是否主料' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={0}>否</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="isFlavour"
                  label="是否调料"
                  rules={[{ required: true, message: '请选择是否调料' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={0}>否</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                name="quantity"
                label="默认用量"
                rules={[{ required: true, message: '请输入默认用量' }]}
              >
                <Input placeholder="请输入默认用量，如：500g、2个等" />
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RecipeManagement;