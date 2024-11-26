import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsCount,
  getFeaturedProducts,
  getFeaturedProductsWithCount,
  updateProductGallery
} from "../controllers/productsController.js";
import { uploadOptions } from "../middlewares/imageUploader.js";

const router = express.Router();

//get all Products
router.get("/", getProducts);

//get single Product
router.get("/:id", getProduct);

//create a Product
router.post("/", uploadOptions.single("image"), createProduct);

//update a Product
router.put("/:id", uploadOptions.single("image"), updateProduct);
//update a Product's gallery images
router.put("/update-gallery/:id", uploadOptions.array("images"), updateProductGallery);

//delete a Product
router.delete("/:id", deleteProduct);
//get featured Products
router.get("/get/featured", getFeaturedProducts);
router.get("/get/featured/:count", getFeaturedProductsWithCount);
//get Products count
router.get("/get/count", getProductsCount);

export default router;
