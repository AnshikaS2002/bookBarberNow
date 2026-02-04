import express from "express";
import healthRoute from "./routes/health.route";

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/", healthRoute);

export default app;