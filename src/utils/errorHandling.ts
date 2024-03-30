import { Request, Response, NextFunction } from "express";

export const asyncHandler = (
  controller: (req: any, res: any, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(async (error: any) => {
      return res
        .status(error.cause || 500)
        .json({ messagemm: error.message, stack: error.stack });
    });
  };
};

export const GlobalErrorHandling = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(error.cause || 500)
    .json({ messageg: error.message, stackg: error.stack });
};
