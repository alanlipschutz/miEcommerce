import productsModel from "../models/productsModel.js";

const findProduct = async (req, res, next) => {
  const product = productsModel.getProduct(req.params.id);
  if (!product) {
    throw new Error("Product not found");
  }
  next();
};

export { findProduct };
