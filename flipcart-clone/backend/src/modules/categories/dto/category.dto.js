const { validationResult, check } = require("express-validator")

exports.validateCreateCategoryDto = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required'),
    check('parentId','Parent Id must be mongo id')
        .optional()
        .isMongoId()
]

exports.validateParamCategoryId = [
    check('categoryId')
        .notEmpty()
        .isMongoId()
        .withMessage('Please enter categoryId is must be a mongoId')
]
exports.validateUpdateCategoryDto = [
    check('name','Category name is required')
        .optional()
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