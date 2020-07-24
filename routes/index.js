var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const indexController = require('../controllers/indexController');


/* GET home page. */
router.get('/', indexController.root);
router.get('/search', indexController.search);


module.exports = router;
