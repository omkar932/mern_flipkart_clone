const express = require('express')
const { adminOnlyAuthGuard } = require('../../auth/service/auth.service')
const { createCart } = require('../service/cart.service')
const router = express.Router()
router.post(
    '/add-to-cart',
    adminOnlyAuthGuard,
    (req, res) => createCart(req, res)
)

module.exports = router