import cors from "cors";
import express from "express";
import minioRouter from "./routes/minio.route"
import healthRouter from "./routes/health.route";
import bearerAuthentication from "./lib/auth/bearerAuth";

const version = "v1";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRouter);
app.use(bearerAuthentication);
app.use(`/${version}/minio`, minioRouter)

export default app;
