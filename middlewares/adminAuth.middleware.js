const authMethod = require("../services/auth/auth.methods");
const db = require("../models/index");
const authMethods = require("../services/auth/auth.methods");
const admin = async (req, res, next) => {
    const accessToken = req.cookies.authorization;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (accessToken) {
        const verified = await authMethods.verifyToken(accessToken, accessTokenSecret);
        if (verified) {
            const user = await db.User.findOne({
                where: {
                    username: verified.payload,
                },
                attributes: {
                    exclude: ["password", "token", "refreshToken"],
                },
            })
            req.user = user
            if (req.user) {
                return next();
            }

        } else {
            return res.redirect("/admin/auth")
        }
    } else {
        return res.redirect("/admin/auth")
    }
};
module.exports = {
    admin: admin,
};
