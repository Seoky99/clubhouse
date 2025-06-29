const { Router } = require('express');
const clubController = require('../controllers/clubController');
const { isAuth } = require('../controllers/authMiddleware');

const clubRouter = Router(); 

clubRouter.post("/write", isAuth, clubController.clubWritePost);
clubRouter.get("/write", isAuth, clubController.clubWriteGet);
clubRouter.get("/", isAuth, clubController.clubGet);


module.exports = clubRouter; 