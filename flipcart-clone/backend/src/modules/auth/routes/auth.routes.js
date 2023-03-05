const express = require('express');
const { validateUserLoginDto, isRequestValidated } = require('../../../utils/validators/validator');
const router = express.Router()
const {userLogin} = require('../../users/service/user.service')

router.post(
    '/login',
    validateUserLoginDto,
    isRequestValidated,
    (req,res)=>userLogin(req.body,res)
    )

module.exports = router;