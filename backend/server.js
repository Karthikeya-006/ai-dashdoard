const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => console.log(`🚀 Server running on port ${port}`));