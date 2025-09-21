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


app.use(globalErrorHandler);

export default app;
