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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandling = exports.asyncHandler = void 0;
const asyncHandler = (controller) => {
    return (req, res, next) => {
        controller(req, res, next).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            return res
                .status(error.cause || 500)
                .json({ messagemm: error.message, stack: error.stack });
        }));
    };
};
exports.asyncHandler = asyncHandler;
const GlobalErrorHandling = (error, req, res, next) => {
    return res
        .status(error.cause || 500)
        .json({ messageg: error.message, stackg: error.stack });
};
exports.GlobalErrorHandling = GlobalErrorHandling;
