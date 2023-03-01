const { emailAlreadyExist, phoneAlreadyExist, incorrectPassword, loginSuccessfully } = require("../../../common/ResponseMessages/errorResponseMessages")
const { userCreatedSuccessfully, UserFetchSuccessfully, UserNotFound, userUpdatedSuccessfully, UserDeletedSuccessfully } = require("../../../common/ResponseMessages/successResponseMessage")
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');
const { createJwtToken, } = require('../../auth/service/auth.service');
const { findUserByEmail } = require("./user.utils");

const findUserById = async (userId, res = undefined) => {
    const findUser = await userModel.findOne({ _id: userId, })
        .exec()
    if (!findUser) return { status: false, message: UserNotFound }
    if (res) return res.status(200).json({
        message: UserFetchSuccessfully,
        user: findUser
    })
    return { status: true, message: UserFetchSuccessfully, response: findUser, }
}

const findUserByPhone = async (phone) => {
    const findUser = await userModel.findOne({ phone: phone, })
        .exec()
    if (!findUser) return { status: false, message: UserNotFound }
    return { status: true, message: UserFetchSuccessfully, response: findUser, }
}

const findIfUserAlreadyExist = async ({ email, phone }) => {
    if (email) {
        const checkIfEmailExist = await findUserByEmail(email)
        if (checkIfEmailExist.status) return { status: false, message: emailAlreadyExist }
    }
    if (phone) {
        const checkIfPhoneExist = await findUserByPhone(phone)
        if (checkIfPhoneExist.status) return { status: false, message: phoneAlreadyExist }
    }
    return { status: true };
}

const findIfUserAlreadyExistWhileUpdating = async ({
    email,
    phone,
    UserRes,
}) => {
    if (email) {
        if (email != UserRes?.email) {
            let getEamilToBeUpdated = await findUserByEmail(email);
            if (getEamilToBeUpdated.status) return { status: false, message: emailAlreadyExist }
        }
        return { status: true };
    }
    if (phone) {
        if (phone != UserRes?.phone) {
            let getEamilToBeUpdated = await findUserByPhone(phone);
            if (getEamilToBeUpdated.status) return { status: false, message: phoneAlreadyExist }
        }
        return { status: true };
    }
}

const createUser = async (requestBody, response) => {
    let {
        firstName,
        lastName,
        email,
        password,
        phone, } = requestBody.body

    const findUserExist = await findIfUserAlreadyExist({ email, phone })
    if (password) password = await bcrypt.hash(password, 10)
    if (!findUserExist.status) return response.status(400).json({
        message: findUserExist.message
    })

    const register = new userModel({ firstName, lastName, email, password, phone })
    await register.save();

    return response.status(201).json({
        message: userCreatedSuccessfully,
        user: register,
    })

}

const findAllUsers = async (
    filterData,
    res = undefined) => {
    try {
        let { offset, limit } = filterData;
        offset = offset ? offset : 0;
        limit = limit ? limit : 10;
        const findUser = await userModel.find(filterData, null, { offset: offset, limit: limit })
            .exec()
        if (!findUser) return { status: false, message: UserNotFound }

        if (res) return res.status(200).json({
            message: UserFetchSuccessfully,
            user: findUser
        })
        return { status: true, message: UserFetchSuccessfully, response: findUser, }
    } catch (error) {
        throw error;
    }
}

const updateUser = async (userId, updateUserData, res = undefined) => {
    const checkUser = await findUserById(userId)
    const UserRes = checkUser.response;
    if (!checkUser.status) return res.status(400).json({
        message: checkUser.message
    })
    const { phone, email } = updateUserData;
    const findUserExist = await findIfUserAlreadyExistWhileUpdating({
        email, phone, UserRes
    })

    if (!findUserExist.status) return res.status(400).json({
        message: findUserExist.message
    })
    if (updateUserData.password) updateUserData.password = await bcrypt.hash(updateUserData.password, 10)
    const findUser = await userModel.findOneAndUpdate({ _id: userId, }, updateUserData, { new: true })
        .exec()
    if (res) return res.status(200).json({
        message: userUpdatedSuccessfully,
        user: findUser
    })
}

const deleteUser = async (userId, res = undefined) => {
    const findUser = await userModel.findByIdAndDelete({ _id: userId, })
        .exec()
    if (!findUser) return { status: false, message: UserNotFound }
    if (res) return res.status(200).json({
        message: UserDeletedSuccessfully,
        user: findUser
    })
    return { status: true, message: UserDeletedSuccessfully, response: findUser, }
}

const userLogin = async (reqBody, res) => {
    const { email, password } = reqBody
    const findUserByeamil = await findUserByEmail(email)
    if (!findUserByeamil.status) return res.status(400).json({
        message: findUserByeamil.message,
    })
    const comparePassword = await bcrypt.compare(password, findUserByeamil.response?.password)
    if (!comparePassword) throw res.status(400).json({
        message: incorrectPassword
    })
    const getJwtToken = await createJwtToken(findUserByeamil.response)
    return res.status(200).json({
        message: loginSuccessfully,
        user: findUserByeamil.response,
        token: getJwtToken,
    })
}

module.exports = {
    findUserById,
    createUser,
    findIfUserAlreadyExistWhileUpdating,
    findIfUserAlreadyExist,
    findUserByPhone,
    findAllUsers,
    updateUser,
    deleteUser,
    userLogin,
}