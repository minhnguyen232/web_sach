const db = require("../../models/index");
const bcrypt = require("bcrypt");
const Helper = require("../../Utils/Helper");
const jwt = require("jsonwebtoken");
const salt = 10;
const authMethod = require("./auth.methods");
const randToken = require("rand-token");

const createNewUser = async (data) => {
  let hashPassword = await HashUserPassword(data.password);
  let token = await Helper.token(15);
  const newUser = {
    username: data.username,
    fullname: data.fullname,
    email: data.email,
    password: hashPassword,
    role: data.role,
    token: token,
  };
  const user = await db.User.findOne({
    where: {
      username: data.username,
    },
    rows: true,
  });
  return new Promise(async (resolve, reject) => {
    try {
      if (user) {
        resolve({
          code: 409,
          message: "Username is already taken !",
        });
      } else {
        await db.User.create(newUser);
        resolve({
          code: 200,
          message: "Create success",
        });
      }
    } catch (err) {
      reject({
        code: 500,
        message: err.message,
      });
    }
  });
};
const loginPassPort = async (data) => {
  const hashPassword = await HashUserPassword(data.password);
  const username = data.username;
  const password = data.password;
  const accessTokenLife =
    process.env.ACCESS_TOKEN_LIFE || Helper.jwtVariable.accessTokenLife;
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || Helper.jwtVariable.accessTokenSecret;
  const refreshTokenSize =
    process.env.REFRESH_TOKEN_SIZE || Helper.jwtVariable.refreshTokenSize;

  return new Promise(async (resolve, reject) => {
    try {
      await db.User.findOne({
        where: {
          username: username,
        },
      }).then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
              resolve({
                code: 401,
                message: err.message,
              });
            }
            if (result) {
              const accessToken = await authMethod.generateToken(
                user.username,
                accessTokenSecret,
                accessTokenLife
              );

              if (!accessToken) {
                resolve({
                  code: 401,
                  message: "Username or Password incorrect !",
                });
              }
              let refreshToken = randToken.generate(refreshTokenSize);
              if (!user.refreshToken) {
                updateRefreshToken(username, refreshToken);
              } else {
                refreshToken = user.refreshToken;
              }
              resolve({
                code: 200,
                message: "Login Successful !",
                accessToken: accessToken,
                user: {
                  username: user.username,
                  fullname: user.fullname,
                  role: user.role,
                  email: user.email,
                  status: user.status,
                  accessToken: accessToken,
                  refreshToken: user.refreshToken,
                },
              });
            } else {
              resolve({
                code: 401,
                message: "Username or Password incorrect !",
              });
            }
          });
        } else {
          resolve({
            code: 401,
            message: "Account not found !",
          });
        }
      });
    } catch (err) {
      console.log(err);
      reject({
        code: 401,
        message: "No Account Found!",
      });
    }
  });
};
const updateRefreshToken = (username, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = db.User.findOne({
        where: {
          username: username,
        },
      });
      let values = {
        refreshToken: refreshToken,
      };
      let condition = {
        where: {
          username: username,
        },
      };
      if (user) {
        await db.User.update(values, condition);
      }
      resolve(refreshToken);
    } catch (err) {
      reject(err);
    }
  });
};
const HashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
const CheckPassword = async (password, user_id) => {
  const user = await db.User.findOne({
    where: {
      id: user_id
    }
  })
  return new Promise(async (resolve, reject) => {
    try {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          resolve(false)
        }
        if (result) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    } catch (err) {
      reject(false);
    }
  })

}
module.exports = {
  loginPassPort: loginPassPort,
  createNewUser: createNewUser,
  CheckPassword: CheckPassword,
  HashUserPassword: HashUserPassword,
};
