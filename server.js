const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//db
mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('db connected'))
  .catch((error) => console.log(error))
//import routes
const authRoutes = require("./routes/auth")

// app middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }))

//middleware
app.use("/api", authRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Api is running on port ${port}`))