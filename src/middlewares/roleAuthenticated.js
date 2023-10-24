const AppError = require("../utils/AppError");

function roleAuthenticated(userRole) {
  return (request, response, next) => {
    const { role } = request.user;

    if (!userRole.includes(role)) {
      throw new AppError("unathorized", 400);
    }

    return next();
  };
}

module.exports = roleAuthenticated;
