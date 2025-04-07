const { z } = require("zod");

const listingSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters long" }),

  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(200, { message: "Description must not exceed 200 characters" }),

  image: z
    .string({ required_error: "Image is required" }),

  country: z
    .string({ required_error: "Country is required" })
    .trim(),

  location: z
    .string({ required_error: "Location is required" })
    .trim(),
    price: z.preprocess((val) => Number(val), z.number({
      required_error: "Price is required"
    }).positive({ message: "Price must be a positive number" })),    
});

module.exports = listingSchema;
