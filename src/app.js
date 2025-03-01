import e from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = e()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Middleware to parse JSON bodies
app.use(e.json());
app.use(e.json({limit: "16kb"}))
app.use(e.urlencoded({extended: true, limit: "16kb"}))
app.use(e.static("public"))
app.use(cookieParser())

//routes import
import userRoutes from "./routs/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRoutes)
// http://localhost:8000/api/v1/users/register

export default app;  //exporting app to use in other files