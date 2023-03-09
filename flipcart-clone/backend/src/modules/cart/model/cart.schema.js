const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const commonSchema = require('../../../common/commonSchema');

const cartSchema = extendSchema(commonSchema, {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    cartItem: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
            quantity: {type: Number, default:1 },
            price: { type:Number, default:0}
        }
    ]
})

module.exports = mongoose.model('Cart', cartSchema)