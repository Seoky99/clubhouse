const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post('/login', authController.loginPost);
authRouter.get('/login', authController.loginGet);
authRouter.get("/signup", authController.signupGet); 
authRouter.post("/signup", authController.signupPost);

module.exports = authRouter; 
