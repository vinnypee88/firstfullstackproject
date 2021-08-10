//this file contains the functions to retrieve data from the db
const pool = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class authorize {
  createToken(id) {
    return jwt.sign({ id }, "vinod secret string", {
      expiresIn: 3 * 24 * 60 * 60,
    });
  }

  async login(email, password) {
    const user = await this.getUserByEmail(email);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  }

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
    const { firstName, lastName, email, address, dateOfBirth } = reqbody;
    //check credential types
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      address == "" ||
      dateOfBirth == ""
    ) {
      return false;
    } else {
      const registered = await pool.query(
        "INSERT INTO users (first_name, last_name, email, password, address, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [firstName, lastName, email, hashedPassword, address, dateOfBirth]
      );
      return registered;
    }
  }
}

module.exports = authorize;
