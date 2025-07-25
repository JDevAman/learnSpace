import z from "zod";

// Store amounts as integers in smallest currency unit (paise for INR)
// 1 INR = 100 paise
// Example: ₹123.45 = 12345 paise

// Helper functions for conversion
const rupeesToPaise = (rupees) => Math.round(rupees * 100);
const paiseToRupees = (paise) => paise / 100;

// Validation schema that accepts rupees but stores as paise
const rupeeAmountSchema = z.number()
    .positive("Amount must be positive")
    .max(100000, "Amount limit exceeded (₹1 lakh)")
    .refine((val) => {
        // Check if it has more than 2 decimal places
        return Number.isInteger(val * 100);
    }, {
        message: "Amount can have up to 2 decimal places"
    })
    .transform(rupeesToPaise); // Convert to paise for storage

const transferSchema = z.object({
    to: z.string().min(1, "Receiver user ID is required"),
    amount: rupeeAmountSchema
});

const addMoneySchema = z.object({
    amount: rupeeAmountSchema
});

const requestMoneySchema = z.object({
    to: z.string().min(1, "Requester ID is required"),
    amount: rupeeAmountSchema
});

export {
    transferSchema,
    addMoneySchema,
    requestMoneySchema,
    rupeesToPaise,
    paiseToRupees
};