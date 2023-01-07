const express = require('express');
const router = express.Router()
const userService = require('../service/user.service')

router.post('/register', async (req, res) => userService.createUser(req, res))
router.get('/getUser/:userId', (req, res) => userService.findUserById(req.params.userId, res))
router.get('/getUsers', (req, res) => userService.findAllUsers(req.query, res))
router.patch('/updateUser/:userId', (req, res) => userService.updateUser(req.params.userId, req.body, res))
router.delete('/deleteUser/:userId', (req, res) => userService.deleteUser(req.params.userId, res))

module.exports = router;