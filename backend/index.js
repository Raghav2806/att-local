import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes/userRoutes.js";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://attendance-pink.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*" 
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", router);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
