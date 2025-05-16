const userResource = require("../../resources/userResource")


const fetchData = async (req , res, next) => {

    res.json({
        'user' : new userResource(req.user)
    })
};

module.exports = {
    fetchData,
};