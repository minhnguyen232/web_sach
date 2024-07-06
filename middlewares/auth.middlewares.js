const authMethod = require("../services/auth/auth.methods");
const db = require("../models/index");
const isAuth = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.x_authorization;
  const accessToken = req.cookies.authorization;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (accessToken) {
    try {
      const verified = await authMethod.verifyToken(accessToken, accessTokenSecret);
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
        return next();

      } else {
        return returnRes(res)
      }

    } catch (err) {
      return returnRes(res)
    }
  } else if (accessTokenFromHeader) {
    try {
      const verified = await authMethod.verifyToken(accessToken, accessTokenFromHeader);
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
        return next();

      } else {
        return returnRes(res)
      }

    } catch (err) {
      return returnRes(res)
    }
  } else {
    return returnRes(res)
  }

};
const returnRes = (res) => {
  return res
    .status(401)
    .json({
      code: 401,
      message: "Bạn không có quyền truy cập vào tính năng này!"
    });
}
module.exports = {
  isAuth: isAuth,
};
