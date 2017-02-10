const jwt = require('jsonwebtoken');
const config = require('../../config');

if (!config.AUTH_TOKEN_SECRET) {
  throw new Error('AUTH_TOKEN_SECRET not set');
}

const authorize = (token, requiredPermissions) => {
  try {
    // make sure user is logged in
    const user = jwt.verify(token, config.AUTH_TOKEN_SECRET);

    // make sure user have the required permissions
    user.permissions = user.permissions || [];
    requiredPermissions.forEach((p) => {
      if (user.permissions.indexOf(p) === -1) {
        throw new Error('user is unauthorized to take this action');
      }
    });
    return user;
  } catch (e) {
    throw new Error('invalid token');
  }
};

const authenticate = (user) => {
  return jwt.sign(user, config.AUTH_TOKEN_SECRET);
};

module.exports = { authenticate, authorize };
