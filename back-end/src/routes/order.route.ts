import { Router } from "express";
import {
    createOrderController,
    getAllOrderController,
    getOrderByIdController
} from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.post(
    "/create",
    createOrderController
);

orderRoutes.get(
    "/all",
    getAllOrderController
);

orderRoutes.get(
    "/:id",
    getOrderByIdController
)

export default orderRoutes;