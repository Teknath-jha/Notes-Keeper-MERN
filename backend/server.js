const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is working");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((x) => x._id === req.params.id);
//   if (note) {
//     res.send(note);
//   } else {
//     res.send(`Note does not exists with id : ${req.params.id} `);
//   }
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);
app.use(notFound);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
