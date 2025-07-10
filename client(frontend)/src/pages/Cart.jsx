import { useEffect } from "react";
import UseCart from "../contexts/UseCart";

function Cart() {
  const { cart, setCart } = UseCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Error fetching cart items", data.message);
        } else {
          setCart(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [setCart]);

  if (!cart) {
    return <p>no items add</p>;
  }
  return (
    <>
      {cart.map((item) => (
        <div key={item.id} className="mx-12 my-2 p-2">
          <div className="m-2 flex gap-3 items-center">
            <p className="font-bold">{item.name} </p>
            <button className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg">
              -
            </button>
            <p>{item.quantity}</p>
            <button className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg">
              +
            </button>

            <button className="bg-red-500 px-2 text-white rounded shadow-sm hover:bg-red-600">
              remove
            </button>
            <p className="font-bold">${item.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Cart;
