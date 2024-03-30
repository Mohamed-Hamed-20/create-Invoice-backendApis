import joi, { AnySchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const req_FE = ["body", "params", "query", "file", "files", "headers"];

export const valid = (schema: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    const Validation_error: any[] = [];
    req_FE.forEach((key: string) => {
      if (schema[key]) {
        const validationResult = schema[key as keyof typeof schema].validate(
          req[key],
          {
            abortEarly: false,
          }
        );
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

export const validateObjectId = (value: any, helper: any) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("Invalid ID");
};

export const generalFields: { [key: string]: AnySchema } = {
  email: joi
    .string()
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
  _id: joi.string().custom(validateObjectId),
  file: joi.object({
    size: joi.number(),
  }),
};
