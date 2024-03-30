"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalFields = exports.validateObjectId = exports.valid = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const req_FE = ["body", "params", "query", "file", "files", "headers"];
const valid = (schema) => {
    return (req, res, next) => {
        const Validation_error = [];
        req_FE.forEach((key) => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], {
                    abortEarly: false,
                });
                if (validationResult.error) {
                    Validation_error.push(validationResult.error.details);
                }
            }
        });
        if (Validation_error.length > 0) {
            return res.status(400).json({
                message: "Validation Error",
                "Error Message": Validation_error,
            });
        }
        return next();
    };
};
exports.valid = valid;
const validateObjectId = (value, helper) => {
    return mongoose_1.Types.ObjectId.isValid(value) ? true : helper.message("Invalid ID");
};
exports.validateObjectId = validateObjectId;
exports.generalFields = {
    email: joi_1.default
        .string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
    password: joi_1.default
        .string()
        .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
        .required(),
    _id: joi_1.default.string().custom(exports.validateObjectId),
    file: joi_1.default.object({
        size: joi_1.default.number(),
    }),
};
