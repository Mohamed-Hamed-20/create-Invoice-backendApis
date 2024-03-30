import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const InvoiceModel = model("Invoice", invoiceSchema);

export default InvoiceModel;
