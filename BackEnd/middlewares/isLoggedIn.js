const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
       req.flash("error", "You must have to logged in to access this");
       return res.redirect("/");
    }

    try {
        const decoded = JWT.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();

        if (!req.user) {
            throw new Error();
        }
    } catch (error) {
        req.flash("error", "Your session has expired. Please log in again.");
        res.clearCookie("token");
        return res.redirect("/");
    }
}
