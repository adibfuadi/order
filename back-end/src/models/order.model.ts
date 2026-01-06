import mongoose, { Document, Schema } from "mongoose";

export interface OrderDocument extends Document {
    user: mongoose.Types.ObjectId;
    totalAmount: number;
}

const orderSchema = new Schema<OrderDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalAmount: {
            type: Number,
            required: false,
            default: 0,
        },
    },
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;