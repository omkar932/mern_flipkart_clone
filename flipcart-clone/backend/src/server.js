const express = require('express')
const app = express();
const env = require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose  = require('./common/mongoConnection.model')
const userRoutes = require('./modules/users/routes/user.routes')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api/user',userRoutes)
app.use('/api/auth',require('./modules/auth/routes/auth.routes'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})