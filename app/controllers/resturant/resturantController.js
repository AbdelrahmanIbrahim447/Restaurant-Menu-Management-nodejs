const resturantRepository = require("../../repositories/resturantRepository");


const fetch = async (req, res, next) => {
    
    try {
        const user = req.user;
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = parseInt(req.query.perPage, 10) || 10;
    
        const resturants = await resturantRepository.paginate(
            { user_id: user.id },
            ['*'],
            page,
            perPage,
            false
        );

        res.json(resturants);
    
    } catch (error) {
        next(error);
    }
};

const store = async (req,res,next) => {
    try{

    const user = req.user;
    
    const resturant_id = await resturantRepository.create({
        'title' : req.body.title,
        'description' : req.body.description,
        'location' : req.body.location,
        'user_id' : user.id
    });
    
    const resturant  = await resturantRepository.find(resturant_id,['id','title','description','location','created_at','updated_at']);

    res.json(resturant);
    } catch (error) {
        next(error);
    }
    
}

const show = async (req,res,next) => {
    try{
        const user = req.user;
        const resturant_id = req.params.id;
        const resturant = await resturantRepository.firstWhere({id:resturant_id,user_id:user.id},['id','title','description','location','created_at','updated_at']);
        res.json(resturant);
    } catch (error) {
        next(error);
    }   

} 

const update = async (req,res,next) => {
    try{
        const user = req.user;
        const resturant_id = req.params.id;
        const updatedResturant = await resturantRepository.update({id : resturant_id,user_id:user.id},{
            'title' : req.body.title,
            'description' : req.body.description,
            'location' : req.body.location,
        });
        const resturant  = await resturantRepository.find(resturant_id,['id','title','description','location','created_at','updated_at']);
        res.json(resturant);
    } catch (error) {
        next(error);
    }
}


const destroy = async (req,res,next) => {
    try{
        const user = req.user;
        const resturant_id = req.params.id;
        const resturant = await resturantRepository.delete( {id : resturant_id,user_id:user.id});
        res.json(resturant);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetch,
    store,
    update,
    destroy,
    show
};