const express = require('express')
const { isRequestValidated } = require('../dto/category.dto')
const { adminOnlyAuthGuard } = require('../../auth/service/auth.service')
const { validateCreateCategoryDto, validateParamCategoryId, validateUpdateCategoryDto } = require('../dto/category.dto')
const { createCategory, findCategoryById, findAllCategories } = require('../service/categories.service')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'/../../uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' +file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })
router.post(
    '/create',
    adminOnlyAuthGuard,
    validateCreateCategoryDto,
    isRequestValidated,
    upload.single('image'),
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