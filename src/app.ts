import express, { Application } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import "dotenv/config";
import { reqLoggerMiddleware } from "./middleware/req.logger.middlware";
import { homeRouter } from "./routes/home.route";
import { userRouter } from "./routes/user.route";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(reqLoggerMiddleware);

app.use("/", homeRouter);
app.use("/user", userRouter);

export { app };
