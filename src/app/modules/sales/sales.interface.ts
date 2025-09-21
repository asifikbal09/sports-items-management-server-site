import { Types } from "mongoose"

export type TSales ={
    sellerId:Types.ObjectId,
    productId:Types.ObjectId,
    branchId:Types.ObjectId,
    quantity:number,
    totalPrice:number,
    saleDate:Date
    buyerName:string
}