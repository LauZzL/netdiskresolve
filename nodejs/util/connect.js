const server = require('../config/server')

module.exports = (req, res) => {
    res.send({
        code:0,
        isrun:server['isrun'],
        message:"success"
    })
}