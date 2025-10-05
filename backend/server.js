import express from "express";
import cors from "cors";
import "dotenv";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

// middleware setup
app.use(express.json());

// route endpoint
app.get("/", (req, res) => res.send("Api Successfully Connected"));

// start
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
