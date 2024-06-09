import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./database/connectToDB.js"
import router from "./api/index.js"
import cookieParser from "cookie-parser";

const PORT = 3001;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// to grab data from client side and process it in server side
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for cookies
app.use(cookieParser());

// api endpoint
app.use("/api", router);




app.get("/", (req, res) => {
  res.json({ message: "Server running successfully" });
});



app.listen(PORT || process.env.PORT, () => {
  console.log("Server run on port " + PORT);
  connectToDB()
});
