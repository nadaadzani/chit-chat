const { verifyToken } = require("../helpers/jwtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Unauthorized" };
    }

    const access_token = authorization.split(" ")[1];
    // console.log(access_token);
    const payload = verifyToken(access_token); // <<<<<<< dari jwtoken

    const user = await User.findOne({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.loginInfo = {
      userId: user.id,
      username: user.username,
      status: user.status,
      avatarUrl: user.avatarUrl
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;