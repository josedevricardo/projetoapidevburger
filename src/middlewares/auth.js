import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

async function authMiddleware(request, response, next) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, authConfig.secret);
        console.log(decoded);
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return response.status(401).json({ error: 'Token expired' });
        }
        return response.status(401).json({ error: 'Token is invalid' });
    }
}

export default authMiddleware;
