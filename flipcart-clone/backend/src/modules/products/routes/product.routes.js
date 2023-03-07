const express = require('express')
const { adminOnlyAuthGuard } = require('../../auth/service/auth.service')
const { createProduct } = require('../service/product.service')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
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
    upload.array('file'),
    (req,res)=>createProduct(req,res)
    )


module.exports = router