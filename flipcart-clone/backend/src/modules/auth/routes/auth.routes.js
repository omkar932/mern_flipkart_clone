const express = require('express');
const router = express.Router()
const {userLogin} = require('../../users/service/user.service')

router.post('/login',(req,res)=>userLogin(req.body,res))

module.exports = router;