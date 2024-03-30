import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connectDB";
import InvoiceRoute from "./routes/invoice.routes";
import { GlobalErrorHandling } from "./utils/errorHandling";
const app = express();
dotenv.config();

//DB connection
connectDB();
//parse data mohamed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Invoice", InvoiceRoute);

//Error Handling
app.use(GlobalErrorHandling);

//port
const port = parseInt(process.env.port as string);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
