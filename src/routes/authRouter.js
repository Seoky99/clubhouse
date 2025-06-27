const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/signup", authController.signupGet); 
authRouter.post("/signup", authController.signupPost);

module.exports = authRouter; 
