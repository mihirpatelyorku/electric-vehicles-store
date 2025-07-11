const db = require("./db/query");

require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");
const bcrypt = require("bcryptjs");

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

app.get("/cars", async (req, res) => {
  try {
    const {
      price,
      mileage,
      brands,
      shape,
      modelYears,
      accidentHistory,
      hot_deal,
    } = req.query;

    const parsedFilters = {
      price,
      mileage,
      brands: brands ? brands.split(",") : [],
      shape: shape ? shape.split(",") : [],
      modelYears: modelYears ? modelYears.split(",") : [],
      accidentHistory: accidentHistory ? accidentHistory.split(",") : [],
      hot_deal: hot_deal === "true",
    };

    const data = await db.getVehicles({ ...parsedFilters });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

app.get("/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await db.getVehicleById(id);
    if (!vehicle)
      return res
        .status(404)
        .json({ message: "Not Found / Not in the Database" });
    res.status(200).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Falied to fetch vehicle!" });
  }
});

app.get("/filters", async (req, res) => {
  try {
    const filteredData = await db.getDistinct();
    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  try {
    const userExists = await db.getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.registerUser(email, hashedPassword, firstname, lastname, mobile);

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: null });
  }
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});
function isAuthenticated(req, res, next) {
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);
  if (req.isAuthenticated()) return next();
  return res.status(200).json({ message: "Unauthorized" });
}

app.get("/cart", isAuthenticated, async (req, res) => {
  try {
    const cart_id = await db.getCartID(req.user.id);
    const cartItems = await db.getCartItems(cart_id);
    console.log(cartItems);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

app.post("/cart", isAuthenticated, async (req, res) => {
  const { vehicle_id } = req.body;
  try {
    const cart_id = await db.getCartID(req.user.id);
    await db.insertCartItems(cart_id, vehicle_id);

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add in cart" });
  }
});

app.patch("/cart/:id", isAuthenticated, async (req, res) => {
  try {
    const vehicle_id = req.params.id;
    const cart_id = await db.getCartID(req.user.id);
    const { quantity } = req.body;
    console.log("cart_id:", cart_id, "vehicle_id:", vehicle_id);

    const updatedItem = await db.updateQuantity(cart_id, vehicle_id, quantity);
    res.status(200).json({ message: "Quantity updated", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

app.delete("/cart/:id", isAuthenticated, async (req, res) => {
  try {
    const vehicle_id = req.params.id;
    const cart_id = await db.getCartID(req.user.id);

    const deleted = await db.removeItemFromCart(cart_id, vehicle_id);
    if (deleted.rowCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

app.post("/check-out", async (req, res) => {
  const {
    firstName,
    lastName,
    street,
    city,
    province,
    postal,
    cardNumber,
    cartItems,
    totalPrice,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !street ||
    !city ||
    !province ||
    !postal ||
    !cardNumber ||
    !cartItems?.length ||
    !totalPrice
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const cardLast4 = cardNumber.slice(-4);
  try {
    const userId=req.user.id
    const addOrder = await db.addOrder({
      userId,
      firstName,
      lastName,
      street,
      city,
      province,
      postal,
      cardLast4,
      cartItems,
      totalPrice,
      
    });
    console.log(addOrder);
    
    res.status(201).json({ message: "Order placed successfully", addOrder });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on PORT ${process.env.PORT}`);
});
