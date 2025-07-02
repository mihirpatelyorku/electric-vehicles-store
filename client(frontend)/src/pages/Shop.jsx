import { useEffect, useState } from "react";
import Search from "../Components/search";
import CarList from "../Components/CarList";

function Shop() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortMileage, setSortMileage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`);
        if (!res.ok) {
          alert("failed to fetch data");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const filteredResults = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="m-4">
        <div className="mb-4">
          <span className="mr-2">Price:</span>
          <label className="mr-4">
            <input
              type="radio"
              name="sortPrice"
              value="price_asc"
              checked={sortPrice === "price_asc"}
              onChange={(e) => setSortPrice(e.target.value)}
            />{" "}
            Low to High
          </label>
          <label className="mr-4">
            <input type="radio" name="sortPrice" value="price_desc" checked={sortPrice === "price_desc"}
              onChange={(e) => setSortPrice(e.target.value)} /> High to
            Low
          </label>
          <label>
            <input type="radio" name="sortPrice" value="" checked={sortPrice === ""}
              onChange={(e) => setSortPrice(e.target.value)}/> Auto
          </label>
        </div>
        <div className="mb-4">
          <span className="mr-2">Mileage:</span>
          <label className="mr-4">
            <input type="radio" name="sortMileage" value="mileage_asc" checked={sortMileage === "mileage_asc"}
              onChange={(e) => setSortMileage(e.target.value)}/> Low to
            High
          </label>
          <label className="mr-4">
            <input type="radio" name="sortMileage" value="mileage_desc" checked={sortMileage === "mileage_desc"}
              onChange={(e) => setSortMileage(e.target.value)}/> High
            to Low
          </label>
          <label>
            <input type="radio" name="sortMileage" value="" checked={sortMileage === ""}
              onChange={(e) => setSortMileage(e.target.value)}/> Auto
          </label>
        </div>
      </div>
      <Search search={search} setSearch={setSearch} />
      {filteredResults.length == 0 ? (
        <div className="h-16 flex justify-center items-center">
          <p className="text-center text-gray opacity-75">no results found</p>
        </div>
      ) : (
        <CarList data={filteredResults} />
      )}
    </>
  );
}
export default Shop;
