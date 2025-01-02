import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Middleware to handle async functions in Express.js
const asyncHandler = (handler: AsyncHandler): AsyncHandler => {
  return async (req:Request, res:Response, next:NextFunction) =>{
    try {
      await handler(req, res, next);
    } catch (error) {
    next(error);
    }
  }
};

export default asyncHandler;
