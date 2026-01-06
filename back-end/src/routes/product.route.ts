import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProdcutByIdController,
  updateProdcutController,
} from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.post(
  "/create",
  createProductController
);

productRoutes.delete("/:id/delete", deleteProductController);

productRoutes.put(
  "/:id/update",
  updateProdcutController
);

productRoutes.get("/all", getAllProductController);

productRoutes.get(
  "/:id",
  getProdcutByIdController
);

export default productRoutes;