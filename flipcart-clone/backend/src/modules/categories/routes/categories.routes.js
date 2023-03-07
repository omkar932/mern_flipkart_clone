const express = require('express')
const { isRequestValidated } = require('../../../utils/validators/validator')
const { adminOnlyAuthGuard } = require('../../auth/service/auth.service')
const { validateCreateCategoryDto, validateParamCategoryId, validateUpdateCategoryDto } = require('../dto/category.dto')
const { createCategory, findCategoryById, findAllCategories } = require('../service/categories.service')
const router = express.Router()

router.post(
    '/create',
    adminOnlyAuthGuard,
    validateCreateCategoryDto,
    isRequestValidated,
    (req,res)=>createCategory(req,res)
    )
router.get(
    '/:categoryId',
    adminOnlyAuthGuard,
    validateParamCategoryId,
    isRequestValidated,
    (req, res) => findCategoryById(req.params.categoryId, res)
)
router.get(
    '/getList/allCategories',
    adminOnlyAuthGuard,
    (req, res) => findAllCategories(req.query, res)
)

module.exports = router