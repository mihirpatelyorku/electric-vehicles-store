import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function CarList({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6 my-2 py-2">
      {data.map((item) => (
        <div key={item.id}>
          <Link
            to={`/cars/${item.id}`}
            className="block no-underline text-black border rounded-2xl shadow-sm hover:bg-red transition h-100 overflow-hidden"
          >
            <div className="space-y-2 overflow-hidden text-ellipsis ">
              <div className="relative">
              <img
                src={item.image_url}
                alt=""
                className="object-fit-cover w-full h-40"
              />
              {item.is_hot_deal ? (<p className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">SALE</p>) : (<></>)}
              </div>

              <div className="p-2">
                {" "}
                <p className="truncate">
                  <strong>
                    {item.model_year} {item.name} | {item.model}
                  </strong>
                </p>
                <p className="truncate">
                  {item.vehicle_type} | {item.brand} | {item.description}
                </p>
                <p className="truncate text-lg font-bold border-t-1 my-3 py-2">
                  ${Math.floor(item.price)}
                </p>
               <button className="mb-2 p-1 rounded w-full bg-amber-300 hover:bg-amber-400">Add to Cart</button>
              </div>
            </div>
                 
          </Link>
          
        </div>
      ))}
    </div>
  );
}

CarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      model_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      price: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CarList;
