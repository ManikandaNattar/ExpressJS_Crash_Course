
const moments = require('moment')

const logger = (req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moments().format()}`)
    next();
}

module.exports=logger;