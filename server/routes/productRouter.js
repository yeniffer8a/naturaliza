import express from "express";
import { listProducts,oneProduct,createNewProduct } from "../controllers/productsController.js";
import { upload } from '../config/multerConfig.js';

const router = express.Router();

router.get("/listproducts", listProducts);
router.get("/oneProduct/:code", oneProduct);

router.post("/createProduct", upload.single('file'),createNewProduct);

export default router;