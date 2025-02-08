import express from "express";
import { listProducts,oneProduct,createNewProduct,productsByName } from "../controllers/productsController.js";
import { upload } from '../config/multerConfig.js';
import { uploadSupabase } from '../middleware/uploadSupabase.js';

const router = express.Router();

router.get("/listproducts", listProducts);
router.get("/oneproduct/:code", oneProduct);
router.get("/productsbyname/:name", productsByName);

router.post("/createProduct", upload.single('file'),uploadSupabase,createNewProduct);

export default router;