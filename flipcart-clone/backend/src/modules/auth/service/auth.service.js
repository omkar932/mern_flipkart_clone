const jwt = require('jsonwebtoken');
const { pleaseEnterValidToken, tokenExpired, onlyAdminHasAccess } = require('../../../common/ResponseMessages/errorResponseMessages');
const {findUserByEmail} = require('../../users/service/user.utils');
require('dotenv')
const createJwtToken = async (userData) => {
    const token = await jwt.sign(
        {
            _id: userData?._id,
            email: userData?.email,
            phone: userData?.phone,
            role: userData?.role
        },
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: '30d' }
    )
    return token
}

const verifyToken = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        const user = jwt.verify(
            token,
            process.env.SECRET_TOKEN_KEY,
            function (err, decoded) {
                if (err) {
                    return res.status(401).json({ error: true, message: tokenExpired });
                }
                req.user = decoded
                next();
            }
        )

    } else {
        return res.status(403).send({
            error: true,
            message: pleaseEnterValidToken
        });
    }
}

const adminOnlyAuthGuard = async (req, res, next) => {
    verifyToken(req,res,next);
    if(req?.user?.role !== 'admin') return res.status(403).send({
        error: true,
        forbidden:403,
        message: onlyAdminHasAccess
    });
}

module.exports = {
    createJwtToken,
    verifyToken,
    adminOnlyAuthGuard,
}