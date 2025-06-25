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

async function getVehicles() {
  const {rows}=await pool.query("SELECT * FROM vehicles")
  return rows;
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  getVehicles
};
