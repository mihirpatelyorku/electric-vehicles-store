require("dotenv").config();
const express = require("express");
const app = express();
const CarsRouter = require("./routes/CarsRouter");
const FilterRouter = require("./routes/FilterRouter");
const CartRouter = require("./routes/CartRouter");
const AuthRouter = require("./routes/AuthRouter");
const ReviewRouter=require("./routes/ReviewRouter")
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");

const { initialize } = require("./passport-config");
initialize(passport);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", AuthRouter);
app.use("/cars", CarsRouter);
app.use("/filters", FilterRouter);
app.use("/cart", CartRouter);
app.use("/reviews",ReviewRouter)

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on PORT ${process.env.PORT}`);
});
