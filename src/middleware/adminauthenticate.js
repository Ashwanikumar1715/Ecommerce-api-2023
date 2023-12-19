// const isAdmin = (req, res, next) => {
//     const user = req.user;

//     // Assuming "ADMIN" is the role for administrators
//     if (!user || user.role !== "ADMIN") {
//       return res.status(403).send({ error: "Access forbidden. Admins only." });
//     }

//     next();
//   };

const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider"); // Import your JWT provider
const { use } = require("..");

const adminauthenticate = async (req, res, next) => {
  // console.log('Request payload before authentication:', req.body);
  // Bearer token..........
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Token not found..." }); // Corrected the status code to 401 for unauthorized
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    // console.log("userId",userId)
    const user = await userService.findUserById(userId);
    // console.log("user",user);
    if (!user || user.role === "CUSTOMER") {
      return res.status(401).send({ error: "Access forbidden. Admins only." }); // You should handle this case
    }
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  // console.log('Request payload after authentication:', req.body);
  next();
};

module.exports = adminauthenticate;
