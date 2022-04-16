const server = require('../config/server')

module.exports = (req, res) => {
    res.send({
        code:0,
        v:server['v'],
        message:"success"
    })
}