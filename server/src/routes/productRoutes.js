import express from "express";
import { getProduct, getProducts } from "../controllers/productController.js";
import { findProduct } from "../middlewares/productNotFound.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(findProduct, getProduct);

export default router;
