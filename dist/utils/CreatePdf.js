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
exports.createInvoicePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const invoiceTemplet_1 = require("./invoiceTemplet");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createInvoicePDF = (invoice) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ message: invoice });
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setContent((0, invoiceTemplet_1.invoiceContent)(invoice));
    // تحديد مسار المجلد الذي تريد حفظ الملف فيه
    const folderPath = path_1.default.join(__dirname, "../../pdfs");
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
    // تصدير الصفحة كملف PDF باسم الملف المحدد
    yield page.pdf({
        path: `${folderPath}/${invoice.userName}_${invoice._id}.pdf`,
        format: "A4",
    });
    yield browser.close();
    return folderPath;
});
exports.createInvoicePDF = createInvoicePDF;
