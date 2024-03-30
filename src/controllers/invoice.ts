import { Request, Response, NextFunction } from "express";
import InvoiceModel from "../DB/models/invoice.model";
import { asyncHandler } from "../utils/errorHandling";
import { createInvoicePDF } from "../utils/CreatePdf";
import { sendEmail } from "../utils/sendEmail";
import { HtmlTEXTInvoice } from "../utils/generateHtml";
interface Product {
  pname: string;
  price: number;
  quantity: number;
  singlePrice?: number;
}

interface InvoiceType {
  products: Product[];
  userName: string;
  phone: string;
  total: number;
  userEmail?: string;
  State: string;
}

export const createInvoice = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { products, userEmail, phone, userName } = req.body;
    console.log({ products, userEmail, phone, userName });

    // التحقق مما إذا كانت قيمة products معرفة وليست undefined
    if (!products) {
      return next(new Error("Products data is missing in the request body."));
    }
    // مواصلة المعالجة
    let total: number = 0;
    const allProducts: Product[] = [];

    // تكرار المنتجات وحساب الإجمالي
    for (const product of products) {
      const singlePrice: number = product.price * product.quantity;
      const singleProduct: Product = {
        pname: product.pname,
        price: product.price,
        quantity: product.quantity,
        singlePrice: singlePrice,
      };
      allProducts.push(singleProduct);
      total += singlePrice;
    }

    // بناء بيانات الفاتورة
    const invoiceData: InvoiceType = {
      products: allProducts,
      userName,
      phone,
      total,
      State: "pending",
    };

    // إضافة البريد الإلكتروني إذا كان موجودًا
    if (userEmail) {
      invoiceData.userEmail = userEmail;
    }

    // إنشاء الفاتورة باستخدام بيانات الفاتورة المجمعة
    const invoice = await InvoiceModel.create(invoiceData);

    // إرسال الاستجابة
    return res.status(200).json({
      message: "Invoice created successfully",
      result: invoice,
      total: invoice.total,
    });
  }
);

export const usersearch = asyncHandler(async (req, res, next) => {});

export const sendPdf = asyncHandler(async (req, res, next) => {
  const { InvoiceId } = req.body;
  console.log(InvoiceId);
  const invoice = await InvoiceModel.findById({ _id: InvoiceId });
  if (!invoice) {
    return next(new Error("Invalid Invoice Id"));
  }

  //generate PDF 
  const folderPath = await createInvoicePDF(invoice);
  
  console.log(invoice.userEmail);

//send email
  const isSend = await sendEmail({
    to: invoice.userEmail || "",
    subject: "Confirm your purchase",
    html: `${HtmlTEXTInvoice(invoice)}`,
    attachments: [
      {
        filename: `${invoice.userName}_${invoice._id}.pdf`,
        path: `${folderPath}/${invoice.userName}_${invoice._id}.pdf`,
        contentType: "application/pdf",
      },
    ],
  });
  if (!isSend) {
    return next(new Error("Error Email not send"));
  }
  return res.json({
    message: "PDF create sussusfully and email is send to you ",
  });
});
export const userseddarch = asyncHandler(async (req, res, next) => {});
