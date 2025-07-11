import { useState, useCallback, useEffect } from "react";
import CartContext from "./CartContext";
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${itemId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );
      if (!res.ok) throw new Error("Failed to update quantity");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to remove item");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };
  const addToCart = async (vehicle_id, user_id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_id, user_id }),
    });

    if (!res.ok) throw new Error("Failed to add item");

   
    await fetchCart();
  } catch (err) {
    setError(err.message);
  }
};

  const totalPrice = cart.reduce((sum, curr) => {
    return sum + parseFloat(curr.price) * curr.quantity;
  }, 0);

  
  return (
    <CartContext.Provider
      value={{ cart, loading, error, updateQuantity, removeItem, fetchCart,addToCart,totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
