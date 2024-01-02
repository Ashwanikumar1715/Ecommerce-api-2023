// adminauthenticate.js
const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");

const adminauthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token); // Log the token

    if (!token) {
      return res.status(401).send({ error: "Token not found..." });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    console.log("UserID:", userId); // Log the user ID

    const user = await userService.findUserById(userId);
    console.log("User:", user); // Log the user object

    if (!user || user.role !== "ADMIN") {
      console.log("Non-admin user or user not found");
      return res.status(404).send({ error: "Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in adminauthenticate:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = adminauthenticate;
