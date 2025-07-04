const pool = require("./pool");

async function registerUser(email, password, firstName, lastName, mobile) {
  await pool.query(
    "INSERT INTO users(email,password,firstname,lastname,mobile) VALUES($1,$2,$3,$4,$5)",
    [email, password, firstName, lastName, mobile]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email= $1", [
    email,
  ]);
  return rows[0];
}

async function getUserById(id) {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
  return rows[0];
}

async function getVehicleById(id){
  const {rows} = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);
  console.log("Vehicle row:", rows[0]);
  return rows[0];
}

async function getVehicles({price,mileage}={}) {
  let query="SELECT * FROM vehicles"
  const orderClause=[]
  if(price){
    orderClause.push(`price ${price.toUpperCase()}`)
  }
    if(mileage){
    orderClause.push(`mileage ${mileage.toUpperCase()}`)
  }

  if(orderClause.length){
    query+=` ORDER BY ${orderClause.join(", ")}`
  }

  const {rows}=await pool.query(query)
  return rows;
}

async function getDistinct() {
  try {
    const brands= await pool.query("SELECT DISTINCT brand FROM vehicles ORDER BY brand")
    const modelYears= await pool.query("SELECT DISTINCT model_year FROM vehicles ORDER BY model_year DESC")
    const shape = await pool.query("SELECT DISTINCT vehicle_type FROM vehicles ORDER BY vehicle_type")
    return {
      brands: brands.rows.map(item=>item.brand),
      modelYears: modelYears.rows.map(item=>item.model_year),
      shape: shape.rows.map(item=>item.vehicle_type),
      accidentHistory: ["With Accidents / Damages","Without Accidents / Damages"]
    };
  } catch (err) {
    console.error("Error in getDistinct:", err);
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  getVehicles,
  getDistinct,
  getVehicleById
};


