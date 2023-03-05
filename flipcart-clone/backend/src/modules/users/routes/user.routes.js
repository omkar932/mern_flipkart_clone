const express = require('express');
const router = express.Router()
const { createUser, findAllUsers, findUserById, updateUser, deleteUser } = require('../service/user.service')
const { verifyToken, adminOnlyAuthGuard } = require('../../auth/service/auth.service');
const { validateUserRegisterDto, isRequestValidated, validateParamUserId, validateUserUpdateDto } = require('../../../utils/validators/validator');

router.post(
    '/register',
    verifyToken,
    validateUserRegisterDto,
    isRequestValidated,
    (req, res) => createUser(req, res)
)
router.get(
    '/getUser/:userId',
    verifyToken,
    validateParamUserId,
    isRequestValidated,
    (req, res) => findUserById(req.params.userId, res)
)
router.get(
    '/getUsers',
    adminOnlyAuthGuard,
    (req, res) => findAllUsers(req.query, res)
)
router.patch(
    '/updateUser/:userId',
    validateUserUpdateDto,
    isRequestValidated,
    verifyToken,
    (req, res) => updateUser(req.params.userId, req.body, res)
)
router.delete(
    '/deleteUser/:userId',
    adminOnlyAuthGuard,
    validateParamUserId,
    isRequestValidated,
    (req, res) => deleteUser(req.params.userId, res)
)

module.exports = router;