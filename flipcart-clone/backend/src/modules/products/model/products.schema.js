const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const commonSchema = require('../../../common/commonSchema');

const productSchema = extendSchema(commonSchema, {
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
    price: {
        type: Number,
        require: true,
        default: 0
    },
    quantity:{
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    offer: {
        type: Number
    },
    images: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
            review: String,
        },
    ],
    category: {type:mongoose.Schema.Types.ObjectId, ref:'Categories',require:true}
})

module.exports = mongoose.model('Product', productSchema)