import { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
  console.log(`Path: ${req.path}`,err);
  throw new Error(" internal server Error");
}

export default errorHandler