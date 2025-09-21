import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../types/error';
import { $ZodIssue } from 'zod/v4/core';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  let errorMessage: string = '';
  const errorMessageArray = err.issues.map((issue: $ZodIssue) => {
    return {
      path: issue.path.at(-1),
      message: issue.message,
    };
  });

  errorMessageArray.forEach(
    (message) =>
      (errorMessage =
        errorMessage +
        `${String(message.path)} is  ${message.message}. `.toLowerCase()),
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorMessage,
  };
};

export default handleZodError;