require("dotenv").config();
const express = require("express"),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  helmet = require("helmet");

const app = express();

const corsConfig = cors({ origin: `${process.env.CORS_ACCEPT_URL}` });

app.use(corsConfig);
app.use(helmet());

app.listen(PORT, () => {
  console.log("App is running!");
  // mongoose.connect(process.env.DB_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   keepAlive: true,
  // });
});
