
const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};




module.exports = authMiddleware;
