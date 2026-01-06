import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    price: number;
    stock: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: false,
            trim: true,
            default: 0,
        },
        stock: {
            type: Number,
            required: false,
            trim: true,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;