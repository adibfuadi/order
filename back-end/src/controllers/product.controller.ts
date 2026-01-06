import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createProductSchema,
  productIdSchema,
  updateProcuctSchema,
} from "../validation/product.validation";
import {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service";
import { HTTPSTATUS } from "../config/http.config";

export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const body = createProductSchema.parse(req.body);

    const { product } = await createProductService(
      userId,
      body
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Product created successfully",
      product,
    });
  }
);

export const updateProdcutController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const body = updateProcuctSchema.parse(req.body);

    const productId = productIdSchema.parse(req.params.id);

    const { updatedProduct } = await updateProductService(
      productId,
      body
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Product updated successfully",
      task: updatedProduct,
    });
  }
);

export const getAllProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const filters = {
      keyword: req.query.keyword as string | undefined,
    };

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 10,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllProductService(filters, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "All product fetched successfully",
      ...result,
    });
  }
);

export const getProdcutByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const productId = productIdSchema.parse(req.params.id);

    const task = await getProductByIdService(productId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Product fetched successfully",
      task,
    });
  }
);

export const deleteProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const productId = productIdSchema.parse(req.params.id);

    await deleteProductService(productId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Product deleted successfully",
    });
  }
);