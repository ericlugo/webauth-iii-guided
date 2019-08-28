const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  token
    ? jwt.verify(token, 'secret', (err, decodedToken) => {
        err
          ? res.status(401).json({
              success: false,
              message: `Invalid Authorization.\n${err}`,
            })
          : ((req.decodedJWT = decodedToken), next());
      })
    : res.status(401).json({
        success: false,
        message: `NO SOUP FOR YOU!`,
      });
};
