const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const commonSchema = require('../../../common/commonSchema');

const categorySchema = extendSchema(commonSchema, {
    name: {
        type: String,
        require: true,
        trim: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    parentId: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Categories', categorySchema)