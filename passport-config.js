const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const authorize = require("./models/auth-models");
const authorizeInstance = new authorize();

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await authorizeInstance.getUserByEmail(email); //this function will connect to db
    if (!user) {
      return done(null, false, { message: "No User with that email" }); //if no user found in db
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        //this will compare password entry to password in db
        return done(null, user);
      } else {
        return done(null, false, {
          message: "password and/or email incorrect",
        });
      }
    } catch (error) {
      done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  //first param is object referting to what is being verified, by default password is password so no need to explicitly add. Will use email as the username. Second param is the callback function
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    return done(null, authorizeInstance.getUserById(id));
  });
};

module.exports = initialize;
