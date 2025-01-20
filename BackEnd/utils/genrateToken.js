const JWT = require("jsonwebtoken");

const genrateToken = (user) => {
    return JWT.sign({email: user.email, _id: user._id}, process.env.JWT_KEY, {expiresIn: "7days"});
}

module.exports = { genrateToken };
