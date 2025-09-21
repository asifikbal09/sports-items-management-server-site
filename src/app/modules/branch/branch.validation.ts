import z from "zod";

const createBranchValidationSchema = z.object({
    body:z.object({
        name:z.string({error:"Branch name is required"}),
        address:z.string({error:"Branch address is required"}),
        longitude:z.number().optional(),
        latitude:z.number().optional(),
    })
})

export const BranchValidation = {
    createBranchValidationSchema
}