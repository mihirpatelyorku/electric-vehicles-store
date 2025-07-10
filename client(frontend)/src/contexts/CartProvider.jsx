import { useState } from "react";
import CartContext from "./CartContext";
function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
