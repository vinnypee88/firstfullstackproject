//this file contains the functions to retrieve data from the db
const pool = require("../db/db");

class authorize {
  async getUserByEmail(email) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.length !== 0) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id) {
    try {
      const userById = await pool.query("SELECT * FROM users where id=$1", [
        id,
      ]);
      if (userById.length !== 0) {
        return userById.rows[0];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async register(reqbody, hashedPassword) {
    const { first_name, last_name, email, address, dateOfBirth } = reqbody;
    const registered = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, address, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6)",
      [first_name, last_name, email, hashedPassword, address, dateOfBirth]
    );
    return registered;
  }
}

module.exports = authorize;
