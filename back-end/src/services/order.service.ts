import mongoose from "mongoose";
import DetailOrder from "../models/detailOrder.model";
import OrderModel from "../models/order.model";

export const createOrderService = async (
    userId: string,
    body: {
        totalAmount: number;
        products: { productId: string; quantity: number; price: number }[];

    }
) => {
    const { totalAmount, products } = body;

    const order = new OrderModel({
        user: userId,
        totalAmount
    });

    await order.save();

    const detailOrders = products.map((p) => ({
        order: order._id,
        product: new mongoose.Types.ObjectId(p.productId),
        quantity: p.quantity,
        price: p.price,
    }));

    await DetailOrder.insertMany(detailOrders);

    return { order, products: detailOrders };
};

export const getAllOrderService = async (
    userId: string,
    pagination: {
        pageSize: number;
        pageNumber: number;
    }
) => {
    const query: Record<string, any> = {};

    //Pagination Setup
    const { pageSize, pageNumber } = pagination;
    const skip = (pageNumber - 1) * pageSize;

    const [order, totalCount] = await Promise.all([
        OrderModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 })
            .where({ user: userId }),
        OrderModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
        order,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip,
        },
    };
};

export const getOrderByIdService = async (orderId: string) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new Error("Invalid order id");
    }

    const order = await OrderModel.findById(orderId).lean();
    if (!order) {
        throw new Error("Order not found");
    }

    interface DetailOrderPopulated {
        product: {
            _id: string;
            name: string;
            price: number;
            stock: number;
        };
        quantity: number;
        price: number;
    }

    const detailOrders = await DetailOrder.find({ order: order._id })
        .populate({
            path: "product",
            select: "name price stock",
        })
        .lean<DetailOrderPopulated[]>();

    const products = detailOrders.map((detail) => {
        const product = detail.product as any; // atau specific type
        return {
            productId: product._id,
            name: product.name,
            price: detail.price,
            quantity: detail.quantity,
        };
    });

    return {
        order: {
            _id: order._id,
            user: order.user,
            totalAmount: order.totalAmount
        },
        products,
    };
};