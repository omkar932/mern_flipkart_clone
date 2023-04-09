const express = require('express')
const app = express();
const env = require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose  = require('./common/mongoConnection.model')
const userRoutes = require('./modules/users/routes/user.routes')
const path = require('path')
var cors = require('cors')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api/user',userRoutes)
app.use('/api/auth',require('./modules/auth/routes/auth.routes'))
app.use('/api/category',require('./modules/categories/routes/categories.routes'))
app.use('/api/product',require('./modules/products/routes/product.routes'))
app.use('/api/cart',require('./modules/cart/routes/cart.routes'))
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})