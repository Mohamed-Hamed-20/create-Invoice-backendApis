"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createInvoiceSchema = {
    body: joi_1.default.object({
        userEmail: joi_1.default.string().required(),
        products,
        phone,
        userName,
    }),
};
