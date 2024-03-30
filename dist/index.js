"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./DB/connectDB"));
const invoice_routes_1 = __importDefault(require("./routes/invoice.routes"));
const errorHandling_1 = require("./utils/errorHandling");
const app = (0, express_1.default)();
dotenv_1.default.config();
//DB connection
(0, connectDB_1.default)();
//parse data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/Invoice", invoice_routes_1.default);
//Error Handling
app.use(errorHandling_1.GlobalErrorHandling);
//port
const port = parseInt(process.env.port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
