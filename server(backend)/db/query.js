const pool=require("./pool")

async function registerUser(email,password,firstName,lastName,mobile) {
    await pool.query("INSERT INTO users(email,password,firstname,lastname,mobile) VALUES($1,$2,$3,$4,$5)",[email,password,firstName,lastName,mobile])
}

module.exports={
    registerUser
}
