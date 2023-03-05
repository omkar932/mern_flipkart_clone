const { check, validationResult } = require('express-validator')
exports.validateUserRegisterDto = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required'),
    check('phone')
        .notEmpty()
        .isMobilePhone('en-IN')
        .withMessage('phone is required'),
    check('role')
        .notEmpty()
        .withMessage('role is required'),
]
exports.validateUserLoginDto = [
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required')
]
exports.validateUserUpdateDto = [
    check('firstName')
        .optional(),
    check('lastName')
        .optional(),
    check('email', 'Please enter valid email')
        .isEmail()
        .optional(),
    check('password', 'Please enter valid password')
        .optional()
        .isLength({ min: 5 }),
    check('phone', 'Please enter valid phone number')
        .optional()
        .isMobilePhone('en-IN'),
    check('role')
        .optional(),
    check('userId')
        .notEmpty()
        .isMongoId()
        .withMessage('Please enter userId is must be a mongoId')
]
exports.validateParamUserId = [
    check('userId')
        .notEmpty()
        .isMongoId()
        .withMessage('Please enter userId is must be a mongoId')
]
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array().map(err => err.msg)
        })
    }
    next()
}
