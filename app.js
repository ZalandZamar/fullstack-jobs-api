require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./DB/connectDB");
const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobRoutes");
const authMiddleWare = require("./middleware/authMiddleware");

const notFound = require("./middleware/not-found");

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>you app is up and running<h1/>`);
});

app.use("/api/auth", authRouter);
app.use("/api/jobs", authMiddleWare, jobsRouter);

//error handling middleware
app.use(notFound);

const PORT = process.env.PORT || 3500;

const start = async (url) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
