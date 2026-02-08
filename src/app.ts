import express from "express";
import healthRoute from "./routes/health.route";
import userRoutes from "./routes/user.route";
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/", healthRoute);
app.use("/api/users", userRoutes);

export default app;