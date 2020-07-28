var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controllers/cartController');


/* GET cart listing. */
//router.get('/', function(req, res, next) {
//  res.render('cart');
//});

router.get('/', cartController.show);

/************ ADD Items to CART ************/
/* GET - Form to create */
router.get('/plus/:id', cartController.plus);
router.get('/add/:id', cartController.create);
router.get('/minus/:id', cartController.minus);

/************ CONFIRMAR compra  ************/
router.get('/confirm/:id', cartController.confirm);

/* POST - Store in Data Base */
/*router.post('/create/', productsController.store);*/

/************ DELET ONE PRODUCT from cart ************/
/* DELETE - Delete from Data Base */
router.get('/remove/:id', cartController.remove);

module.exports = router;

