import jwt    from 'jsonwebtoken';
import config from 'config';

const getToken = (user) => {
    return jwt.sign(user.toJSON(), config.get('jwtSecret'), {
        expiresIn: '48h'
    });
};

const isAuth = (req, res, next) => {
    const token = req.headers.Authorization;
    if (token) {
        const onlyToke = token.slice(7, token.length);
        jwt.verify(onlyToke, config.get('jwtSecret'), (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message: 'Invalid token'});
            }
            req.user = decodedToken;
            return next();
        });
    } else {
        res.status(401).json({message: 'Token not supplyed'});
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).json({message: 'Admin token is not valid'});
};

export {getToken, isAuth, isAdmin};