const userResource = require("../../resources/userResource")


const fetchData = async (req , res, next) => {
    try{
        res.json({
            'user' : new userResource(req.user)
        })
    }catch(error)
    {
        next(error)
    }
};

module.exports = {
    fetchData,
};