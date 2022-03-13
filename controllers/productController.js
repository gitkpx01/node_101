const ProductModel = require("../models/productModel")
const { getPostData } = require("../utils")



async function getProducts(req, res) {

    try {
        const products = await ProductModel.findAll()
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify(products))

    } catch (error) {
        console.log(error)
    }

}

async function getProduct(req, res, id) {

    try {
        const product = await ProductModel.findById(id)

        if (!product) {
            return res.end(JSON.stringify({ message: "Product not found" }))

        }
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify(product))

    } catch (error) {
        console.log(error)
    }

}

async function createProduct(req, res) {

    try {

        const { title, description, price } = JSON.parse(await getPostData(req))
        const product = {
            title: title,
            price: price,
            description: description
        }

        const newProduct = await ProductModel.create(product)

        res.writeHead(201, {
            "Content-Type": "application/json"
        })
        // res.end(JSON.stringify({message : "Product Successfully Created"}))
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }

}

async function updateProduct(req, res, id) {

    try {

        const { title, description, price } = JSON.parse(await getPostData(req))
        const product = {
            title: title,
            price: price,
            description: description
        }

        const updatedProduct = await ProductModel.update(id, product)

        res.writeHead(201, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify(updatedProduct))

    } catch (error) {
        console.log(error)
    }
}


async function removeProduct(req, res, id) {

    try {
        const product = await ProductModel.findById(id)

        if (!product) {
            return res.end(JSON.stringify({ message: "Product not found" }))

        } else {
            const result = await ProductModel.remove(product.id)

            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            return res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
}