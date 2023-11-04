const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartservice=require("../services/cart.service.js");
const User = require("../models/user.model.js");
const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    
    const jwt = jwtProvider.generateToken(user._id);
    console.log(user)
    await cartservice.createCart(user);

    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found with email:", email });
    }
    const isPasswordValid = await bcrypt.compare(password,(await user).password);


    if (!isPasswordValid) {
      return res.status(404).send({ message: "invalid password.." });
    }
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
};

module.exports={register,login}
