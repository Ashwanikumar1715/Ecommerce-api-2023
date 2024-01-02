const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider"); // Import your JWT provider

const authenticate = async (req, res, next) => {

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Token not found..." }); // Corrected the status code to 401 for unauthorized
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = userService.findUserById(userId);
    if (!user) {
      return res.status(401).send({ error: "User not found..." }); // You should handle this case
    }
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  // console.log('Request payload after authentication:', req.body);
  next();
};

module.exports = authenticate;
