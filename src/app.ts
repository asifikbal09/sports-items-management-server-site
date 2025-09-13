import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";
import cors from "cors";
import config from "./app/config";
import router from "./app/routes";
import httpStatus from "http-status";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    success: true,
    message: "Welcome to the Sports Items Management API",
  });
});

app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorMessage = "Something went wrong!";
  let errorDetails = err;
  let stack = config.NODE_ENV === "development" ? err?.stack : null;

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
