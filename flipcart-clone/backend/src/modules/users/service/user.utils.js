const { UserNotFound } = require("../../../common/ResponseMessages/errorResponseMessages")
const { UserFetchSuccessfully } = require("../../../common/ResponseMessages/successResponseMessage")
const userModel = require("../model/user.schema")


const findUserByEmail = async (email) => {
    const findUser = await userModel.findOne({ email: email, })
        .exec()
    if (!findUser) return { status: false, message: UserNotFound }
    return { status: true, message: UserFetchSuccessfully, response: findUser, }
}

module.exports = {
    findUserByEmail,
}