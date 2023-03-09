const categoriesSchema = require("../model/categories.schema")
const { findCategoryIfExistByName, isCategoryNameDuplicate } = require("./categories.utils")
var slugify = require('slugify')
const { CategoryCreatedSuccessfully, CategoryNameAlreadyExist, CategoryFetchSuccessfully, CategoryUpdatedSuccessfully } = require("../../../common/ResponseMessages/successResponseMessage")
const { categoryNotFound } = require("../../../common/ResponseMessages/errorResponseMessages")
const createCategory = async (req,response) => {
    let { name, parentId } = req.body
    slug = slugify(name)
    const findCategoryExist = await findCategoryIfExistByName(name)
    if (findCategoryExist.status) return response.status(400).json({
        message: CategoryNameAlreadyExist,
    })
    let files;
    if (req.file) files =`${process.env.LOCALHOST_API}${process.env.PORT}/public/${req.file.filename}`;

    const createCategory = new categoriesSchema({ name, parentId, slug,image:files  })
    await createCategory.save();

    return response.status(201).json({
        message: CategoryCreatedSuccessfully,
        category: createCategory,
    })

}
const findCategoryById = async (categoryId, res = undefined) => {
    const findCategory = await categoryModel.findOne({ _id: categoryId, })
        .exec()
    if (!findCategory) return { status: false, message: categoryNotFound }
    if (res) return res.status(200).json({
        message: CategoryFetchSuccessfully,
        category: findCategory
    })
    return { status: true, message: CategoryFetchSuccessfully, response: findCategory, }
}


const getRecursiveCategories = (categories, parentId=null ) =>{
    const categoryList = [];
    let category;
    if(!parentId){
        category = categories.filter(cat => cat.parentId === undefined)
    }else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate?._id,
            name:cate?.name,
            slug:cate?.slug,
            children:getRecursiveCategories(categories,cate._id)
        })
    }
    return categoryList;
}

const findAllCategories = async (
    filterData,
    res = undefined) => {
    try {
        let { offset, limit } = filterData;
        offset = offset ? offset : 0;
        limit = limit ? limit : 10;
        const findCategories = await categoriesSchema.find(filterData, null, { offset: offset, limit: limit })
            .exec()
        if (!findCategories) return { status: false, message: categoryNotFound }
        const categoriesList = getRecursiveCategories(findCategories)
        if (res) return res.status(200).json({
            message: CategoryFetchSuccessfully,
            user: categoriesList
        })
        return { status: true, message: CategoryFetchSuccessfully, response: findCategories, }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createCategory,
    findCategoryById,
    findAllCategories,
}