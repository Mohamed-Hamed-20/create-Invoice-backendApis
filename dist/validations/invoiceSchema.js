"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPdfSchema = exports.createInvoiceSchema = exports.ProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const valiation_1 = require("../middleware/valiation");
exports.ProductSchema = joi_1.default
    .object({
    pname: joi_1.default.string().min(3).max(50).required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required().max(100),
})
    .required();
exports.createInvoiceSchema = {
    body: joi_1.default
        .object({
        userEmail: joi_1.default.string().email({ tlds: { allow: ["com", "net", "gov"] } }),
        products: joi_1.default.array().items(exports.ProductSchema).required(),
        phone: joi_1.default.string().length(11).required(),
        userName: joi_1.default.string().min(3).max(20).required(),
    })
        .required(),
};
exports.sendPdfSchema = {
    body: joi_1.default
        .object({
        InvoiceId: joi_1.default.string().custom(valiation_1.validateObjectId).required(),
    })
        .required(),
};
