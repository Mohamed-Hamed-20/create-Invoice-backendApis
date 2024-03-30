"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceContent = void 0;
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
// invoiceTemplate.ts
const invoiceContent = (invoice) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f7f7f7; /* تغيير لون الخلفية */
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff; /* لون خلفية المحتوى */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo {
            width: 100px;
            height: auto;
            border-radius: 50%; /* تدوير الشعار */
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            margin-top: 10px;
            color: #333333; /* لون اسم الشركة */
        }
        .invoice-info {
            margin-bottom: 20px;
        }
        .user-info {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        .total {
            text-align: right;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 14px; /* حجم النص */
        }
        .contact-info {
            margin-top: 30px;
        }
        .contact-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .contact-item {
            margin-bottom: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dxjng5bfy/image/upload/v1706636681/Genaral%20IMgs/zobvxofxh4ubju4f4qle.jpg" alt="Company Logo" class="logo">
            <div class="company-name">Banha University</div>
        </div>
        <div class="invoice-info">
            <div>Your order Id: ${invoice._id}</div>
            <div>Date: ${formatDate(invoice.createdAt)}</div>
        </div>
        <div class="user-info">
            <div>User Name: ${invoice.userName}</div>
            <div>User Email: ${invoice.userEmail}</div>
            <div>Phone: ${invoice.phone}</div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.products
        .map((product) => `
                <tr>
                    <td>${product.pname}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>${product.singlePrice}</td>
                </tr>
                `)
        .join("")}
            </tbody>
        </table>
        <div class="total">Total: ${invoice.total}</div>
        <div class="footer">Thank you for your business!</div>
        <div class="contact-info">
            <div class="contact-title">Contact us:</div>
            <div class="contact-item">Email: mh674281@gmail.com</div>
            <div class="contact-item">Phone: 01152347186</div>
            <div class="contact-item">Location: Asnet Kafr Shukr, Qalyubia</div>
        </div>
    </div>
</body>
</html>`;
};
exports.invoiceContent = invoiceContent;
