"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userseddarch = exports.sendPdf = exports.usersearch = exports.createInvoice = void 0;
const invoice_model_1 = __importDefault(require("../DB/models/invoice.model"));
const errorHandling_1 = require("../utils/errorHandling");
const CreatePdf_1 = require("../utils/CreatePdf");
const sendEmail_1 = require("../utils/sendEmail");
const generateHtml_1 = require("../utils/generateHtml");
exports.createInvoice = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, userEmail, phone, userName } = req.body;
    console.log({ products, userEmail, phone, userName });
    // التحقق مما إذا كانت قيمة products معرفة وليست undefined
    if (!products) {
        return next(new Error("Products data is missing in the request body."));
    }
    // مواصلة المعالجة
    let total = 0;
    const allProducts = [];
    // تكرار المنتجات وحساب الإجمالي
    for (const product of products) {
        const singlePrice = product.price * product.quantity;
        const singleProduct = {
            pname: product.pname,
            price: product.price,
            quantity: product.quantity,
            singlePrice: singlePrice,
        };
        allProducts.push(singleProduct);
        total += singlePrice;
    }
    // بناء بيانات الفاتورة
    const invoiceData = {
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
    const invoice = yield invoice_model_1.default.create(invoiceData);
    // إرسال الاستجابة
    return res.status(200).json({
        message: "Invoice created successfully",
        result: invoice,
        total: invoice.total,
    });
}));
exports.usersearch = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.sendPdf = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { InvoiceId } = req.body;
    console.log(InvoiceId);
    const invoice = yield invoice_model_1.default.findById({ _id: InvoiceId });
    if (!invoice) {
        return next(new Error("Invalid Invoice Id"));
    }
    //generate PDF 
    const folderPath = yield (0, CreatePdf_1.createInvoicePDF)(invoice);
    console.log(invoice.userEmail);
    //send email
    const isSend = yield (0, sendEmail_1.sendEmail)({
        to: invoice.userEmail || "",
        subject: "Confirm your purchase",
        html: `${(0, generateHtml_1.HtmlTEXTInvoice)(invoice)}`,
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
}));
exports.userseddarch = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
