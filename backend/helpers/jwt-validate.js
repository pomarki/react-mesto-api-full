const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const jwtValidate = (token) => jwt.verify(token, JWT_SECRET);

module.exports = jwtValidate;
