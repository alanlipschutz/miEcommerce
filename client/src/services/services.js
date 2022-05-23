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

async function logIn(email, password) {
  const response = await api.post("/users/login", { email, password });
  return response.data;
}

async function registerUser(name, email, password) {
  const response = await api.post("/users", { name, email, password });
  return response.data;
}
export { getProducts, getProduct, logIn, registerUser };
