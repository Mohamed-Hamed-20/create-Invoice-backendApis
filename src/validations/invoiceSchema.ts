import joi from "joi";
import { validateObjectId } from "../middleware/valiation";

export const ProductSchema = joi
  .object({
    pname: joi.string().min(3).max(50).required(),
    price: joi.number().required(),
    quantity: joi.number().required().max(100),
  })
  .required();
export const createInvoiceSchema = {
  body: joi
    .object({
      userEmail: joi.string().email({ tlds: { allow: ["com", "net", "gov"] } }),
      products: joi.array().items(ProductSchema).required(),
      phone: joi.string().length(11).required(),
      userName: joi.string().min(3).max(20).required(),
    })
    .required(),
};

export const sendPdfSchema = {
  body: joi
    .object({
      InvoiceId: joi.string().custom(validateObjectId).required(),
    })
    .required(),
};
