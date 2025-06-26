import { useEffect, useState } from "react";
import Search from "../Components/search";
import CarList from "../Components/CarList";

function Shop() {
  const [data, setData] = useState([]);
  const [search,setSearch]=useState("");

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

  const filteredResults = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Search search={search} setSearch={setSearch} />
    <CarList data={filteredResults}/>
    </>
  );
}
export default Shop;
