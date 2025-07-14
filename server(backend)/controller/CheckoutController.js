const db = require("../db/query");
exports.checkout=async (req, res) => {
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
}