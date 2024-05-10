//model là nơi chứa những thực thể để mapping qua mongodb
const mongoose = require('mongoose')//tạo model dựa trên mongoose nên phải import vào

//tạo một khung xương cho đối tượng (schema)
const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    // image: {
    //     type: String
    // }
})

//tạo một model cho product
const productModel = mongoose.model('Product', productSchema)
module.exports = productModel