
var slugify = require('slugify')
const { ProductCreatedSuccessfully } = require('../../../common/ResponseMessages/successResponseMessage')
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


// const getRecursiveCategories = (categories, parentId=null ) =>{
//     const categoryList = [];
//     let category;
//     if(!parentId){
//         category = categories.filter(cat => cat.parentId === undefined)
//     }else {
//         category = categories.filter(cat => cat.parentId == parentId)
//     }

//     for(let cate of category){
//         categoryList.push({
//             _id:cate?._id,
//             name:cate?.name,
//             slug:cate?.slug,
//             children:getRecursiveCategories(categories,cate._id)
//         })
//     }
//     return categoryList;
// }

// const findAllCategories = async (
//     filterData,
//     res = undefined) => {
//     try {
//         let { offset, limit } = filterData;
//         offset = offset ? offset : 0;
//         limit = limit ? limit : 10;
//         const findCategories = await categoriesSchema.find(filterData, null, { offset: offset, limit: limit })
//             .exec()
//         if (!findCategories) return { status: false, message: categoryNotFound }
//         const categoriesList = getRecursiveCategories(findCategories)
//         if (res) return res.status(200).json({
//             message: CategoryFetchSuccessfully,
//             user: categoriesList
//         })
//         return { status: true, message: CategoryFetchSuccessfully, response: findCategories, }
//     } catch (error) {
//         throw error;
//     }
// }


module.exports = {
    createProduct
}