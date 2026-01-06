import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createOrderService, getAllOrderService, getOrderByIdService } from "../services/order.service";
import { HTTPSTATUS } from "../config/http.config";
import { createOrderSchema, orderIdSchema } from "../validation/order.validation";

export const createOrderController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const body = createOrderSchema.parse(req.body);

        const { order, products } = await createOrderService(
            userId,
            body
        );

        return res.status(HTTPSTATUS.OK).json({
            message: "Order successfully",
            order,
            products
        });
    }
);

export const getAllOrderController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const pagination = {
            pageSize: parseInt(req.query.pageSize as string) || 10,
            pageNumber: parseInt(req.query.pageNumber as string) || 1,
        };

        const result = await getAllOrderService(userId, pagination);

        return res.status(HTTPSTATUS.OK).json({
            message: "All order fetched successfully",
            ...result,
        });
    }
);

export const getOrderByIdController = asyncHandler(
    async (req: Request, res: Response) => {
        const orderId = orderIdSchema.parse(req.params.id);

        const order = await getOrderByIdService(orderId);

        return res.status(HTTPSTATUS.OK).json({
            message: "Order fetched successfully",
            order,
        });
    }
);