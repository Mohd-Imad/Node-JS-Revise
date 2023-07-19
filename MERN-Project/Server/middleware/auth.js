const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  let token;

  // Check for the token from different sources in order of priority
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Token from Authorization header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query.token) {
    // Token from query parameter (example: /protectedRoute?token=yourTokenHere)
    token = req.query.token;
  } else if (req.cookies.token) {
    // Token from cookie (using the 'cookie-parser' middleware)
    token = req.cookies.token;
  }

  if (!token) {
    // Token not provided
    return res.status(401).json({ msg: 'Unauthorized - Token not provided' });
  }

  try {
    // Verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    // Invalid token
    return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
  }
};

module.exports = auth;
