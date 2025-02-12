import express from "express";
import { listProducts,oneProduct,createNewProduct,productsByName,deleteProduct,updateProductData } from "../controllers/productsController.js";
import { upload } from '../config/multerConfig.js';
import { uploadSupabase } from '../middleware/uploadSupabase.js';
import { tokenValidator } from "../middleware/tokenValidator.js";
import { expressjwt } from "express-jwt";
import { rolUserValidator } from "../middleware/rolUserValidator.js";


const router = express.Router();

router.get("/listproducts", listProducts);
router.get("/oneproduct/:code", oneProduct);
router.get("/productsbyname/:name", productsByName);

router.post("/createProduct", tokenValidator, expressjwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]}),rolUserValidator,upload.single('file'),uploadSupabase,createNewProduct);

router.patch("/updateProduct/",tokenValidator, expressjwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]}),rolUserValidator,upload.single('file'),uploadSupabase,updateProductData);

router.delete("/deleteProduct/:code", tokenValidator, expressjwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]}),rolUserValidator,deleteProduct);

export default router;