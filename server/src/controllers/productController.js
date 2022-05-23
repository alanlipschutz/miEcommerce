import asyncHandler from "express-async-handler";
import productModel from "../models/productsModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.getProducts();
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.getProduct(req.params.id);
  res.status(200).json(product);
});

export { getProducts, getProduct };
