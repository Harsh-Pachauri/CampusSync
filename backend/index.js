const connectToMongo = require("./Database/db");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
var cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://campus-sync-a51q.vercel.app"],
    credentials: true,
  })
);

app.use(express.json()); //to convert request data to json

app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database unavailable. Please try again shortly.",
    });
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/api/admin", require("./routes/details/admin-details.route"));
app.use("/api/faculty", require("./routes/details/faculty-details.route"));
app.use("/api/student", require("./routes/details/student-details.route"));

app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));
app.use("/api/timetable", require("./routes/timetable.route"));
app.use("/api/material", require("./routes/material.route"));
app.use("/api/exam", require("./routes/exam.route"));
app.use("/api/marks", require("./routes/marks.route"));

let isConnecting = false;

const connectWithRetry = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) {
    return;
  }

  isConnecting = true;
  try {
    await connectToMongo();
  } catch (error) {
    console.error(
      `MongoDB unavailable (${error.message}). Retrying in 10 seconds...`
    );
    setTimeout(connectWithRetry, 10000);
  } finally {
    isConnecting = false;
  }
};

const startServer = () => {
  const server = app.listen(port, () => {
    console.log(`Server Listening On http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Close the old server process and restart.`
      );
      return;
    }

    throw error;
  });

  connectWithRetry();
};

startServer();
