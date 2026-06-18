require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

/* Database */
const connectDB = require("./config/db");

/* Routes */
const contactRoutes = require("./routes/contact.route");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes")
const messageRoutes = require("./routes/message.routes")

connectDB();

/* Middleware */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  })
);

/* Routes */
app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/users",
  userRoutes
);



app.use(
  "/api/projects",
   projectRoutes
)

app.use(
  "/api/messages",
  messageRoutes
)
/* Global Error Handler */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.log(
      "GLOBAL ERROR:"
    );

    console.log(err);

    return res
      .status(500)
      .json({
        success: false,
        message:
          err.message,
      });
  }
);
/* Server */
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});