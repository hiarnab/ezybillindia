const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = process.env;

async function getToken(data, expiresIn = '6h') {
  try {
    return jwt.sign(data, JWT_PRIVATE_KEY, { expiresIn });
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return false;
  }
}

async function verifyTokenMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') < 0) {
      return res.status(401).send({ message: 'No Token', code: 'NOT_LOGGED_IN' });
    }
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const data = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = data;
    return next();
  }
  catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token Expired', code: 'NOT_LOGGED_IN' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Invalid Token', code: 'NOT_LOGGED_IN' });
    }
    // eslint-disable-next-line
      console.log(err);
    return res.sendStatus(500);
  }
}

module.exports = {
  getToken,
  verifyTokenMiddleware
};
