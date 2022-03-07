const { rejects } = require("assert")
const fs = require("fs")



function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'UTF-8', (err) => {
        console.log(err)
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {

        try {
            let body = ""

            req.on("data", (chunk) => {
                body += chunk.toString()
            }).on("end", () => {
                resolve(body)
            })

        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    writeDataToFile,
    getPostData
}