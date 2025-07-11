import UseCart from "../contexts/UseCart";

function Cart() {

  const { cart, loading, error, updateQuantity, removeItem } = UseCart();


  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cart.length === 0) return <p>Your cart is empty.</p>;


  return (
    <>
      {cart.map((item) => (
        <div key={item.id} className="mx-12 my-2 p-2">
          <div className="m-2 flex gap-3 items-center">
            <p className="font-bold">{item.name} </p>
            <button className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg" onClick={()=>updateQuantity(item.vehicle_id,Math.max(1,item.quantity-1))}>
              -
            </button>
            <p>{item.quantity}</p>
            <button className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg" onClick={()=>updateQuantity(item.vehicle_id,item.quantity+1)}>
              +
            </button>

            <button className="bg-red-500 px-2 text-white rounded shadow-sm hover:bg-red-600" onClick={()=>removeItem(item.vehicle_id)}>
              remove
            </button>
            <p className="font-bold">${(item.price*item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Cart;


