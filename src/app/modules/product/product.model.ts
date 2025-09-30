import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    size:{
        type:String,
    },
    color:{
        type:String,
    },
    condition:{
        type:String,
        enum:['new','used'],
    },
    material:{
        type:String,
    },
    stype:{
        type:String,
    },
    brand:{
        type:String,
    }
},{
    timestamps:true,
})

export const Product = model<TProduct>('Product',productSchema);