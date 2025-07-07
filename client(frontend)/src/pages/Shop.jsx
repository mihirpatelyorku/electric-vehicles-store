import { useEffect, useState } from "react";
import Search from "../Components/search";
import CarList from "../Components/CarList";
import { useNavigate, useLocation } from "react-router-dom";
function Shop() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortMileage, setSortMileage] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    shape: [],
    modelYears: [],
    accidentHistory: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    shape: [],
    modelYears: [],
    accidentHistory: [],
    hotDeal: false,
  });

  const handlePriceSort = (e) => {
    setSortPrice(e.target.value);
    setSortMileage("");
  };

  const handleMileageSort = (e) => {
    setSortMileage(e.target.value);
    setSortPrice("");
  };
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hotDealParam = params.get("hot_deal");
    const newSelectedFilters = {
      brands: [],
      shape: [],
      modelYears: [],
      accidentHistory: [],
      hotDeal: hotDealParam === "true",
    };

    ["brands", "shape", "modelYears", "accidentHistory"].forEach((key) => {
      const value = params.get(key);
      if (value) {
        // Remove duplicates here
        newSelectedFilters[key] = Array.from(new Set(value.split(",")));
      }
    });

    setSelectedFilters(newSelectedFilters);

    const priceSort = params.get("price");
    const mileageSort = params.get("mileage");

    if (priceSort) {
      setSortPrice(`price_${priceSort}`);
    } else {
      setSortPrice("");
    }

    if (mileageSort) {
      setSortMileage(`mileage_${mileageSort}`);
    } else {
      setSortMileage("");
    }
  }, [location.search]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/filters`);
        const data = await res.json();

        // Convert modelYears numbers to strings to match selectedFilters values
        if (data.modelYears) {
          data.modelYears = data.modelYears.map(String);
        }

        setFilters(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilters();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        if (sortPrice) {
          params.append("price", sortPrice.split("_")[1]);
        }

        if (sortMileage) {
          params.append("mileage", sortMileage.split("_")[1]);
        }

        Object.entries(selectedFilters).forEach(([key, values]) => {
          if (values.length > 0) {
            params.append(key, values.join(","));
          }
        });

        if (selectedFilters.hotDeal) {
          params.append("hot_deal", "true");
        }

        navigate(`?${params.toString().replace(/%2C/g, ",")}`, {
          replace: true,
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/cars${
            params.toString() ? `?${params.toString()}` : ""
          }`
        );
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
  }, [sortPrice, sortMileage, selectedFilters, navigate]);

  const filteredResults = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicle_type.toLowerCase().includes(search.toLowerCase()) ||
      item.model_year.toString().includes(search.toLowerCase())
  );

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[category] || [];

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [category]: Array.from(new Set([...currentValues, value])),
        };
      }
    });
  };

  return (
    <div className="flex">
      {" "}
      <div className="m-4 p-4 border rounded w-full md:w-1/5 self-start overflow-y-auto max-h-screen sticky top-0">
        <div className="mb-4">
          <h5 className="font-semibold capitalize">Price</h5>
          <label className="mr-4 d-block">
            <input
              type="radio"
              name="sortPrice"
              value="price_asc"
              checked={sortPrice === "price_asc"}
              onChange={handlePriceSort}
            />{" "}
            Low to High
          </label>
          <label className="mr-4 d-block">
            <input
              type="radio"
              name="sortPrice"
              value="price_desc"
              checked={sortPrice === "price_desc"}
              onChange={handlePriceSort}
            />{" "}
            High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sortPrice"
              value=""
              checked={sortPrice === ""}
              onChange={handlePriceSort}
            />{" "}
            Auto
          </label>
        </div>
        <div className="mb-4">
          <h5 className="font-semibold capitalize d-block">Mileage</h5>
          <label className="mr-4">
            <input
              type="radio"
              name="sortMileage"
              value="mileage_asc"
              checked={sortMileage === "mileage_asc"}
              onChange={handleMileageSort}
            />{" "}
            Low to High
          </label>
          <label className="mr-4 d-block">
            <input
              type="radio"
              name="sortMileage"
              value="mileage_desc"
              checked={sortMileage === "mileage_desc"}
              onChange={handleMileageSort}
            />{" "}
            High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sortMileage"
              value=""
              checked={sortMileage === ""}
              onChange={handleMileageSort}
            />{" "}
            Auto
          </label>
        </div>

        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className="mb-4">
            <h5 className="font-semibold capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </h5>
            {value.map((v) => (
              <div key={v}>
                <input
                  type="checkbox"
                  name={v}
                  id={v}
                  checked={(selectedFilters[key] || []).includes(String(v))}
                  onChange={() => handleFilterChange(key, v)}
                />
                <label htmlFor={v} className="ml-3">
                  {v}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="py-4 px-6 w-4/5 flex flex-col">
        <Search search={search} setSearch={setSearch} />
        {filteredResults.length == 0 ? (
          <div className="h-16 flex justify-center items-center">
            <p className="text-center text-gray opacity-75">no results found</p>
          </div>
        ) : (
          <CarList data={filteredResults} />
        )}
      </div>
    </div>
  );
}
export default Shop;
