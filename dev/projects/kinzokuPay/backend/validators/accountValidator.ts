import z from "zod";

const rupeesToPaise = (rupees: number) => Math.round(rupees * 100);
const paiseToRupees = (paise: number) => paise / 100;

const rupeeAmountSchema = z
  .number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  })
  .positive("Amount must be positive")
  .max(100000, "Amount limit exceeded (₹1 lakh)")
  .refine((val) => Number.isInteger(val * 100), {
    message: "Amount can have up to 2 decimal places",
  })
  .transform(rupeesToPaise);

export const transferSchema = z.object({
  recipient: z.string().trim().email("Enter a valid email address"),
  amount: rupeeAmountSchema,
  note: z.string().optional(),
});

export const requestMoneySchema = z.object({
  recipient: z.string().trim().email("Enter a valid email address"),
  amount: rupeeAmountSchema,
});

export const addMoneySchema = z.object({
  amount: rupeeAmountSchema,
});

export { rupeesToPaise, paiseToRupees };
