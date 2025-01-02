import dotEnv from "dotenv";
dotEnv.config({
  path: "./.env",
});

import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";


import { CORS_ORIGIN } from "./constants/env";

const app: Express = express();

//middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors middleware
const corsOptions: cors.CorsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["content-type", "Authorization"],
};

app.use(cors(corsOptions));

//cookie middleware
app.use(cookieParser());

app.use(errorHandler)

// import routes and declarations
import healthRoutes from "./routes/health.routes";

//  use routes
app.use("/api/v1/health", healthRoutes);

export { app };
