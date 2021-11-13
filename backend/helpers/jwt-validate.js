const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const jwtValidate = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');

module.exports = jwtValidate;
