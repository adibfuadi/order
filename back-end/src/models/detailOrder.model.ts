import { Schema, model, Document, Types } from "mongoose";

export interface DetailOrderDocument extends Document {
    order: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    price: number; // price at order time
}

const DetailOrderSchema = new Schema<DetailOrderDocument>(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

const DetailOrder = model<DetailOrderDocument>(
    "DetailOrder",
    DetailOrderSchema
);

export default DetailOrder;
