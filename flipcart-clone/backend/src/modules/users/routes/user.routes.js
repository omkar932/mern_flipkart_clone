const express = require('express');
const router = express.Router()
const { createUser, findAllUsers, findUserById, updateUser, deleteUser } = require('../service/user.service')
const { verifyToken, adminOnlyAuthGuard } = require('../../auth/service/auth.service')

router.post('/register', verifyToken, async (req, res) => createUser(req, res))
router.get('/getUser/:userId', verifyToken, (req, res) => findUserById(req.params.userId, res))
router.get('/getUsers', adminOnlyAuthGuard, (req, res) => findAllUsers(req.query, res))
router.patch('/updateUser/:userId', verifyToken, (req, res) => updateUser(req.params.userId, req.body, res))
router.delete('/deleteUser/:userId', adminOnlyAuthGuard, (req, res) => deleteUser(req.params.userId, res))

module.exports = router;