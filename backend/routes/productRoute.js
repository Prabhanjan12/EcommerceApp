const express= require("express")

const {isAuthUser, authorizeRoles}=require("../middleware/authentication")


const router = express.Router();
const {
     getAllProducts,
     createProduct,
     getProductDetails,
     updateProduct,
     deleteProduct,
     getAdminProducts } = require("../controllers/productController");

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthUser, authorizeRoles("admin"), getAdminProducts);

router
.route("/admin/product/new")
.post(isAuthUser,authorizeRoles("admin"),createProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/admin/product/:id")
.put(isAuthUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthUser,authorizeRoles("admin"),deleteProduct)



module.exports=router;