const mongoose = require('mongoose');

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL).then((res)=>{
    console.log("Mongodb connected successfully");
});
