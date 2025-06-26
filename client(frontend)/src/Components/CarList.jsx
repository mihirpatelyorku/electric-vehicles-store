import PropTypes from "prop-types";
function CarList({ data }) {
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

CarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      model_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default CarList;
