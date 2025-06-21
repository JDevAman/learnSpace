import z from "zod";

const transferSchema = z.object({
    from: z.string().min(1, "Sender user ID is required"),      // userId as string (ObjectId)
    to: z.string().min(1, "Receiver user ID is required"),      // userId as string (ObjectId)
    amount: z
        .number({
            required_error: "Amount is required",
            invalid_type_error: "Amount must be a number",
        })
        .positive("Amount must be positive")
        .max(100000, "Transfer limit exceeded")
        .refine(val => Number(val.toFixed(2)) === val, {
            message: "Amount can have up to 2 decimal places",
        }),
});

const balanceSchema = z.object({ from: z.string().min(1, "UserId is required") })

export { transferSchema, balanceSchema };
