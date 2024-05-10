const mongoose = require('mongoose')

//function để connect
const connectMongoDB = () => {
    const URL = "mongodb+srv://cknguyenmanh:admin@cluster0.coj0a6e.mongodb.net/shop-web-db"
    mongoose.connect(URL).then(()=> {
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })
}

//export hàm để sử dụng ở các file khác
module.exports = connectMongoDB