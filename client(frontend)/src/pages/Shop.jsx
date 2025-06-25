import { useEffect, useState } from "react";

function Shop() {
  const [data, setData] = useState([]);
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
  return (
    <>
      {data.map((item) => (
        <div className="mt-5" key={item.id}>
          <p>
            <strong>Name:</strong>
            {item.name}
          </p>
          <p>
            <strong>Model:</strong>
            {item.model}
          </p>
          <p>
            <strong>Year:</strong>
            {item.model_year}
          </p>
        </div>
      ))}
    </>
  );
}
export default Shop;
