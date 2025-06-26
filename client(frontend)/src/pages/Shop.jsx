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
  if(filteredResults.length==0){
    return(<>
    <Search search={search} setSearch={setSearch} />
    <div className="h-16 flex justify-center items-center"><p className="text-center text-gray opacity-75">no results found</p></div>
    </>)
  }

  return (
    <>
    <Search search={search} setSearch={setSearch} />
    <CarList data={filteredResults}/>
    </>
  );
}
export default Shop;
