import puppeteer from "puppeteer";
import { invoiceContent } from "./invoiceTemplet";
import path from "path";
import fs from "fs";

export const createInvoicePDF = async (invoice: any) => {
  console.log({ message: invoice });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(invoiceContent(invoice));

  // تحديد مسار المجلد الذي تريد حفظ الملف فيه
  const folderPath = path.join(__dirname, "../../pdfs");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  // تصدير الصفحة كملف PDF باسم الملف المحدد
  await page.pdf({
    path: `${folderPath}/${invoice.userName}_${invoice._id}.pdf`,
    format: "A4",
  });

  await browser.close();
  return folderPath;
};
