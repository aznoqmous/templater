const path = require("path")
module.exports = {
    entry: {
        main: "./front/index.js"
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, 'public'),
    }
}