const authMethod = require("../services/auth/auth.methods");
const db = require("../models/index");
const isAdmin = async (req, res, next) => {
    const user = req.user;
    const role = user.role;
    if (role == 1) {
        return next();
    } else {
        return res
            .status(401)
            .json({
                code: 401,
                message: "Bạn không có quyền truy cập vào tính năng này!"
            });
    }
};
module.exports = {
    isAdmin: isAdmin,
};
