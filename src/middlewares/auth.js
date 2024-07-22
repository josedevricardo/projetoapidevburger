import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const tokenParts = authToken.split(' ');

  if (tokenParts.length !== 2) {
    return response.status(401).json({ error: 'Token is malformed' });
  }

  const token = tokenParts[1];

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      request.userId = decoded.id; // Atribui o userId ao objeto request
      return next();
    });
  // eslint-disable-next-line no-unused-vars
  } catch ( err ) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
}

export default authMiddleware;
