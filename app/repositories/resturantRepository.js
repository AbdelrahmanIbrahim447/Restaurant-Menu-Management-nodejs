const MysqlRepositoryConcrete = require('./mysqlRepositoryConcrete');

const publicProp = ['*'];

class resturantRepository extends  MysqlRepositoryConcrete {
    
    constructor() {
        super('resturants', true);
    }

}

module.exports = new resturantRepository();