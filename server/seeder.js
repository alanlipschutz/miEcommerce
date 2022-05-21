import mongoose from "mongoose";
import "dotenv/config";
import users from "./src/data/users.js";
import products from "./src/data/products.js";
import User from "./src/schemas/userSchema.js";
import Product from "./src/schemas/productSchema.js";
import Order from "./src/schemas/orderSchema.js";
import connectDB from "./config/db.js";

connectDB();

async function importData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
async function destroyData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
