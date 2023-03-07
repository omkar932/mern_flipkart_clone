const { CategoryNameAlreadyExist } = require("../../../common/ResponseMessages/errorResponseMessages")
const categoriesSchema = require("../model/categories.schema")

const findCategoryIfExistByName = async (name) => {
    const findCategory = await categoriesSchema.findOne({ name: name, })
        .exec()
    if (!findCategory) return { status: false, message: 'Category not found' }
    return { status: true, message: 'Category fetch successfully', response: findCategory, }
}

const isCategoryNameDuplicate = async (newCategoryName, existingCategoryName) => {
    try {
        if (existingCategoryName !== newCategoryName) {
            const getName = await categoriesSchema.findOne({
                name: newCategoryName
            })
            if (getName) return { status: false, message: CategoryNameAlreadyExist }
        }
        return { status: true }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    findCategoryIfExistByName,
    isCategoryNameDuplicate,
}