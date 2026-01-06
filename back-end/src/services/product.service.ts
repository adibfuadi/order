import ProductModel from "../models/product.model";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const createProductService = async (
    userId: string,
    body: {
        name: string;
        price: number;
        stock: number;
    }
) => {
    const { name, price, stock } = body;

    const product = new ProductModel({
        name,
        price,
        stock,
        createdBy: userId
    });

    await product.save();

    return { product };
};

export const updateProductService = async (
    productId: string,
    body: {
        name: string;
        price: number;
        stock: number;
    }
) => {


    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new NotFoundException(
            "Product not found"
        );
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
            ...body,
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new BadRequestException("Failed to update task");
    }

    return { updatedProduct };
};

export const getAllProductService = async (
    filters: {
        keyword?: string;
    },
    pagination: {
        pageSize: number;
        pageNumber: number;
    }
) => {
    const query: Record<string, any> = {};

    if (filters.keyword && filters.keyword !== undefined) {
        query.name = { $regex: filters.keyword, $options: "i" };
    }

    //Pagination Setup
    const { pageSize, pageNumber } = pagination;
    const skip = (pageNumber - 1) * pageSize;

    const [product, totalCount] = await Promise.all([
        ProductModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 }),
        ProductModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
        product,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip,
        },
    };
};

export const getProductByIdService = async (
    productId: string
) => {

    const product = await ProductModel.findOne({
        _id: productId,
    });

    if (!product) {
        throw new NotFoundException("Product not found.");
    }

    return product;
};

export const deleteProductService = async (
    productId: string
) => {
    const product = await ProductModel.findOneAndDelete({
        _id: productId,
    });

    if (!product) {
        throw new NotFoundException(
            "Product not found"
        );
    }

    return;
};