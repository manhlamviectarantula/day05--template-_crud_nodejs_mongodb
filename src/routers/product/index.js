const express = require('express')
const router = express.Router()
const { listItem } = require('../../data/product')
const productModel = require('../../models/product')

// const listItem = [];

//lấy sp bằng phương thức async

router.get('/get-list-item', async (req, res) => {
    const products = await productModel.find()
    return res.status(200).send(products)
})

//phương thức then thay vì async thầy làm

// router.get('/get-list-item', (req, res) => {
//     productModel.find()
//         .then(products => {
//             res.status(200).send(products);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });

router.post('/add-list-item', (req, res) => {
    // const items = [] = req.body
    const item = req.body
    const product = new productModel(item)
    product.save().then(() => {
        console.log('Item added successfully')
    })
    return res.status(201).send("Item added successfully")

    // listItem.push(item)
    // items.forEach(item => {
    //     listItem.push(item);
    // });

})

router.put('/update-one-item/:_id', (req, res) => {
    const updateFields = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    //mongoose mới ko chấp nhận callback

    // productModel.findByIdAndUpdate(req.params._id, updateFields, (error, data) => {
    //     // if (error) {
    //     //     console.error("Error updating item:", error);
    //     //     return res.status(500).send('Internal Server Error');
    //     // }
    //     // if (!data) {
    //     //     return res.status(404).send('Item not found');
    //     // }
    //     return res.status(200).send('Item updated successfully')

    // })

    productModel.findByIdAndUpdate(req.params._id, updateFields)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Item not found');
            }
            return res.status(200).send('Item updated successfully');
        })
        .catch((error) => {
            console.error("Error updating item:", error);
            return res.status(500).send('Internal Server Error');
        });

    // for (let i = 0; i < listItem.length; i++){
    //     if(listItem[i].id == id){
    //         listItem[i] = item
    //     }
    // }

})

router.delete('/delete-one-item/:_id', (req, res) => {
    productModel.findByIdAndDelete(req.params._id)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Item not found');
            }
            return res.status(200).send('Item deleted successfully');
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
            return res.status(500).send('Internal Server Error');
        });

    // const id = req.params.id

    // for (let i = 0; i < listItem.length; i++) {
    //     if (listItem[i].id == id) {
    //         listItem.splice(i, 1)
    //     }
    // }

})

module.exports = router