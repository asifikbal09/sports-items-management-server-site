import z from "zod";

const createSalesValidationSchema = z.object({
  body: z.object({
    productId: z.string({ error: "Product id is required" }),
    sellerId: z.string({ error: "Seller id is required" }),
    branchId: z.string({ error: "Branch id is required" }),
    quantity: z.number({ error: "Quantity is required" }).min(1).int(),
    totalPrice: z.number({ error: "Total price is required" }).min(0),
    saleDate: z.string({ error: "Sale date is required" }),
    buyerName: z.string({ error: "Buyer name is required" }),
  }),
});

export const SalesValidation = {
  createSalesValidationSchema,
};
