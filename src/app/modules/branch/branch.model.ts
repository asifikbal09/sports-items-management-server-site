import { model, Schema } from "mongoose";
import { TBranch } from "./branch.interface";

const branchSchema = new Schema<TBranch>({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    longitude:{
        type:Number,
    },
    latitude:{
        type:Number,
    }
},{
    timestamps:true,
})

export const Branch = model<TBranch>('Branch',branchSchema);