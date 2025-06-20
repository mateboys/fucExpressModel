import express from 'express';
import {
  handleGetProducts,
  handleGetProductDetail,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct
} from '../handlers/productHandlers.js';

const router = express.Router();

// 获取产品列表
router.get('/', async (req, res, next) => {
  try {
    const result = await handleGetProducts(req.query);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 获取单个产品详情
router.get('/:id', async (req, res, next) => {
  try {
    const result = await handleGetProductDetail(req.params.id);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 创建新产品
router.post('/', async (req, res, next) => {
  try {
    const result = await handleCreateProduct(req.body);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 更新产品信息
router.put('/:id', async (req, res, next) => {
  try {
    const result = await handleUpdateProduct(req.params.id, req.body);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 删除产品
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await handleDeleteProduct(req.params.id);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

export default router; 