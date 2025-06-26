const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/", authController.signupGet); 

module.exports = authRouter; 
