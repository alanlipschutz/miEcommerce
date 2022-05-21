import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  withCredentials: true,
});

async function getProducts() {
  const response = await api.get("/products");
  return response.data;
}
async function getProduct(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}
export { getProducts, getProduct };
