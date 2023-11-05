const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.cookie;

  console.log(`log middleware : ${authHeader}`);

  if (!authHeader) {
    throw new AppError("JTW token was not informed ");
  }

  const [, token] = authHeader.split("token=");

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("JTW token was not informed ", 401);
  }
}

module.exports = ensureAuthenticated;
