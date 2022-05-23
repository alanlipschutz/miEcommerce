import Product from "../schemas/productSchema.js";

const getProducts = async () => {
  const products = await Product.find({});
  return products;
};

const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

export default { getProducts, getProduct };
