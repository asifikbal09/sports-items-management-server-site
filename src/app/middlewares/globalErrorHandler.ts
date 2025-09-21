import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import { JsonWebTokenError } from "jsonwebtoken";
import handleJWTError from "../error/handleJWTError";
import AppError from "../error/appError";

// Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorMessage = "Something went wrong!";
  let errorDetails = err;
  let stack = config.NODE_ENV === "development" ? err?.stack : null;

  if (err instanceof ZodError) {
    const getZodError = handleZodError(err);
    statusCode = getZodError?.statusCode;
    message = getZodError?.message;
    errorMessage = getZodError?.errorMessage;
  } else if(err?.name ==="CastError"){
    const getCastError = handleCastError(err)
    statusCode = getCastError?.statusCode
    message = getCastError?.message
    errorMessage = getCastError?.errorMessage
  }else if (err?.code === 11000) {
    const gotDuplicateError = handleDuplicateError(err);
    statusCode = gotDuplicateError?.statusCode;
    message = gotDuplicateError?.message;
    errorMessage = gotDuplicateError?.errorMessage;
  } else if (err instanceof JsonWebTokenError) {
    const gotJWTError = handleJWTError(err);
    statusCode = gotJWTError.statusCode;
    message = gotJWTError.message;
    errorMessage = gotJWTError.errorMessage;
    errorDetails = null;
    stack = null;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorMessage = err?.message;
  } else if (err instanceof Error) {
    errorMessage = err?.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};

export default globalErrorHandler;
