const { Router } = require('express');
const clubController = require('../controllers/clubController');
const { isAuth } = require('../controllers/authMiddleware');

const clubRouter = Router(); 

clubRouter.post("/secret-club/write", isAuth, clubController.secretClubWritePost);
clubRouter.get("/secret-club/write", isAuth, clubController.secretClubWriteGet);
clubRouter.post("/secret-club", isAuth, clubController.secretPost);
clubRouter.get("/secret-club", isAuth, clubController.secretGet);

clubRouter.post("/write", isAuth, clubController.clubWritePost);
clubRouter.get("/write", isAuth, clubController.clubWriteGet);
clubRouter.get("/", isAuth, clubController.clubGet);


module.exports = clubRouter; 