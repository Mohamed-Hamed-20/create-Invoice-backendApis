"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
    },
    products: [
        {
            pname: {
                type: String,
                required: true,
                lowercase: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            singlePrice: {
                type: Number,
                required: true,
            },
        },
    ],
    userEmail: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
        maxlength: 11,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    State: {
        type: String,
        enum: ["paid", "pending"],
    },
}, {
    timestamps: true,
});
const InvoiceModel = (0, mongoose_1.model)("Invoice", invoiceSchema);
exports.default = InvoiceModel;
