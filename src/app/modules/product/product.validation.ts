import e from "express";
import z from "zod";

const createProductValidationSchema = z.object({
    body:z.object({
        name:z.string({error:"Product name is required"}),
        price:z.number({error:"Product price is required"}).min(0),
        quantity:z.number({error:"Product quantity is required"}).min(1).int(),
        imgUrl:z.string({error:"Product image url is required"}),
        description:z.string({error:"Product description is required"}),
        size:z.string().optional(),
        color:z.string().optional(),
        condition:z.enum(['new','used']).optional(),
        material:z.string().optional(),
        stype:z.string().optional(), //Sports types like football cricket etc...
        brand:z.string().optional(),
    })
})

const updateProductValidationSchema = z.object({
     body:z.object({
        name:z.string().optional(),
        price:z.number().optional(),
        quantity:z.number().optional(),
        imgUrl:z.string().optional(),
        description:z.string().optional(),
        size:z.string().optional(),
        color:z.string().optional(),
        condition:z.enum(['new','used']).optional(),
        material:z.string().optional(),
        stype:z.string().optional(), //Sports types like football cricket etc...
        brand:z.string().optional(),
    })
})

export const ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema
}