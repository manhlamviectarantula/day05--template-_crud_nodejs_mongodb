const express = require('express');
const bodyParser = require('body-parser'); //khi gọi request lên body thì cần thứ viện này hỗ trợ để parse chuỗi json ra
// cài bằng (npm i body-parser và import vào như trên)
const app = express();

const path = require('path') //path là thư viện cung cấp bởi express
const { listItem } = require('./data/product')
const productModel = require('./models/product')
const connectMongoDB = require('./dbs/mongodb')//gọi function connect

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());//sử dụng body parser

//init db: khởi tạo
connectMongoDB()//thực thi function connect

app.use('/', require('./routers/index'))

//render
// app.get('/', (req, res) => {
//     const indexView = path.join(__dirname, 'views/index.ejs') //câu lệnh express cung cấp qua thư viện path
//     res.render(indexView, { products: listItem })
// })

app.get('/', (req, res) => {
    const indexView = path.join(__dirname, 'views/index.ejs') //câu lệnh express cung cấp qua thư viện path
    productModel.find({})
    .then(data => {
        res.render(indexView, { products: data })

    })
    .catch(error => {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    });
})

module.exports = app; //export cái 'app' ra bên ngoài để server index.js bên ngoài chạy

