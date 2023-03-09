
var slugify = require('slugify')
const { ProductNotFound } = require('../../../common/ResponseMessages/errorResponseMessages')
const { ProductCreatedSuccessfully, ProductFetchSuccessfully } = require('../../../common/ResponseMessages/successResponseMessage')
const productsSchema = require('../model/products.schema')


const createProduct = async (req, response) => {
    let { name, slug, price, description, category, quantity } = req.body
    slug = slugify(name)
    let files = [];
    if (req.files.length > 0) files = req.files.map(file => {
        return { img: file.filename }
    })
    const createProduct = new productsSchema({
        name,
        slug,
        description,
        price,
        images: files,
        category: category,
        createdBy: req.user._id,
        quantity,
    })
    await createProduct.save();

    return response.status(201).json({
        message: ProductCreatedSuccessfully,
        Product: createProduct,
    })

}
// const findCategoryById = async (categoryId, res = undefined) => {
//     const findCategory = await categoryModel.findOne({ _id: categoryId, })
//         .exec()
//     if (!findCategory) return { status: false, message: categoryNotFound }
//     if (res) return res.status(200).json({
//         message: CategoryFetchSuccessfully,
//         category: findCategory
//     })
//     return { status: true, message: CategoryFetchSuccessfully, response: findCategory, }
// }

const findAllProducts = async (
    filterData,
    res = undefined) => {
    try {
        let { offset, limit } = filterData;
        offset = offset ? offset : 0;
        limit = limit ? limit : 10;
        const findProducts = await productsSchema.find(filterData, null, { offset: offset, limit: limit })
            .exec()
        if (!findProducts) return { status: false, message: ProductNotFound }

        if (res) return res.status(200).json({
            message: ProductFetchSuccessfully,
            user: findProducts
        })
        return { status: true, message: ProductFetchSuccessfully, response: findProducts, }
    } catch (error) {
        throw error;
    }
}
const findProductById = async (productId, res = undefined) => {
    const findProduct = await productsSchema.findOne({ _id: productId, })
        .exec()
    if (!findProduct) return { status: false, message: ProductNotFound }
    if (res) return res.status(200).json({
        message: ProductFetchSuccessfully,
        user: findProduct
    })
    return { status: true, message: ProductFetchSuccessfully, response: findProduct, }
}

module.exports = {
    createProduct,
    findAllProducts,
    findProductById,
}