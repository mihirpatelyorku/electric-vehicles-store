const db = require("../db/query");

exports.cartGet= async (req, res) => {
  try {
    const cart_id = await db.getCartID(req.user.id);
    const cartItems = await db.getCartItems(cart_id);
    console.log(cartItems);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
}

exports.cartPost= async (req, res) => {
  const { vehicle_id } = req.body;
  try {
    const cart_id = await db.getCartID(req.user.id);
    await db.insertCartItems(cart_id, vehicle_id);

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add in cart" });
  }
}

exports.cartPatch= async (req, res) => {
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
}

exports.cartDelete= async (req, res) => {
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
}





