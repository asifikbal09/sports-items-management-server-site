import { model, Schema } from "mongoose";
import { TSales } from "./sales.interface";

const salesSchema = new Schema<TSales>({
    sellerId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    branchId:{
        type:Schema.Types.ObjectId,
        ref:'Branch',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    saleDate:{
        type:Date,
        required:true
    },
    buyerName:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

export const Sales = model<TSales>('Sales',salesSchema);