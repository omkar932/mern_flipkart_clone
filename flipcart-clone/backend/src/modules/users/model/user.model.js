const mongoose = require('mongoose');
const commonSchema = require('../../../common/commonSchema');
const bcrypt = require('bcrypt')
const extendSchema = require('mongoose-extend-schema');
const { userRoleEnum } = require('../../../common/enum/constantEnum');
const userSchema = extendSchema(commonSchema,{
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:20
    },
    lastName:{
        type:String,
        optional:true,
        trim:true,
        min:2,
        max:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:20,
        unique:true,
        index:true,
        lowercase:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        min:10,
        max:10,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:20,
    },
    role:{
        type:String,
        enum:userRoleEnum,
        default:'buyer'
    },
    image:{
        type:String
    },
})

module.exports = mongoose.model('User',userSchema)