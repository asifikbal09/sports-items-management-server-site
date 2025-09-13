import express, { Application, ErrorRequestHandler, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "Welcome to the Sports Items Management API",
  });
});

app.get("/error", (req: Request, res: Response) => {
  throw new Error("This is a test error");
});

app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
  });
});


// Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage = 'Something went wrong!';
  let errorDetails = err;
  let stack = config.NODE_ENV === 'development' ? err?.stack : null;

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};
app.use(globalErrorHandler);

export default app;
