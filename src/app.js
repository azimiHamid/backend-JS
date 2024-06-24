import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration: from /users later it gives the control to the user routers (e.g. in below URL the registerUser comes from userRouter)
app.use("/api/v1/users", userRouter); // The URL it generates: https://localhost:8000/api/v1/users/registerUser or loginUser

export { app };
