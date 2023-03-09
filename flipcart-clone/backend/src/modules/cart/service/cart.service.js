const { ProductNotFound } = require("../../../common/ResponseMessages/errorResponseMessages");
const { CartCreatedSuccessfully } = require("../../../common/ResponseMessages/successResponseMessage");
const { findProductById } = require("../../products/service/product.service");
const cartSchema = require("../model/cart.schema");

const createCart = async (req, response) => {
    let { product, quantity } = req.body
    const userId = req?.user?._id
    let createOrUpdateCart;
    const findProduct = await findProductById(product)
    if (!findProduct) return response.status(400).json({
        message: ProductNotFound
    })
    const findCart = await cartSchema.findOne({ user: userId })
    if (!findCart) {
        const createData = {
            user: userId,
            cartItem: {
                product,
                quantity,
                price: findProduct?.response?.price
            }
        }
        createOrUpdateCart = new cartSchema(createData)
        await createOrUpdateCart.save();
    } else {
        let updateData;
        let updateCondition
        const findProductInCart = await cartSchema.findOne({
            user: userId,
            'cartItem.product': product
        })
        if (!findProductInCart) {
            // if product not exist then add to the cart
            updateCondition = { user: userId }
            updateData = {
                $push: {
                    cartItem: {
                        'product': product,
                        quantity: quantity,
                        price: findProduct?.response?.price
                    }
                }
            }
        } else {
            // else exist update quantity
            updateCondition = { user: userId, 'cartItem.product': product }
            updateData = {
                $set: {
                    'cartItem.$': {
                        product: product,
                        quantity: quantity,
                        price: findProduct?.response?.price,
                    }
                }
            }
        }
        createOrUpdateCart = await cartSchema.findOneAndUpdate(
            updateCondition,
            updateData,
            { new: true }
        )
    }

    return response.status(201).json({
        message: CartCreatedSuccessfully,
        Product: createOrUpdateCart,
    })

}

module.exports = {
    createCart,
}