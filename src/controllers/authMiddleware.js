function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("You are not authorized to view this resource.");
    }
}

function isMember(req, res, next) {

    console.log("?");
    if (req.isAuthenticated() && req.user.member_status) {
        next();
    } else {
        res.status(401).send("You are not authorized to view this resource.");
    }
}



module.exports = { isAuth, isMember };