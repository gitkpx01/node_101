const products = require("../data/products")
const { v4: uuidv4 } = require("uuid")
const { writeDataToFile } = require("../utils")


function findAll() {

    return new Promise((resolve, reject) => {
        resolve(products)
    })
}


function findById(id) {

    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id.toString() === id)
        resolve(product)
    })
}



function create(product) {

    return new Promise((resolve, reject) => {
        const newProduct = {
            id: uuidv4()
            , ...product
        }

        products.push(newProduct)
        writeDataToFile("./data/products.json", products)
        resolve(newProduct)
    })
}



function update(id, product) {

    return new Promise((resolve, reject) => {

        const idx = products.findIndex((p) => p.id.toString() === id)

        const newProduct = {
            title : product.title || products[idx].title,
            price : product.price || products[idx].price,
            description : product.description || products[idx].description
        }
        console.log(newProduct)

        products[idx] = {...products[idx],...newProduct}

        writeDataToFile("./data/products.json", products)
        resolve(products[idx])
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update
}