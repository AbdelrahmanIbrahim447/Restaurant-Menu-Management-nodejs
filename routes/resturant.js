const express = require('express');
const router = express.Router();
const auth = require('../app/middleware/auth');
const validate = require('../app/middleware/validate');
const resturantController = require('../app/controllers/resturant/resturantController');
const { storeValidator } = require('../app/requests/resturants/storeResturant');


router.get('/', auth, resturantController.fetch);
router.get('/show/:id', auth, resturantController.show);
router.post('/store', auth,storeValidator, resturantController.store);
router.put('/update/:id', auth, resturantController.update);
router.delete('/destroy/:id', auth, resturantController.destroy);

module.exports = router;