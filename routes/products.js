// ************ Require's ************
var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const userMiddlewares = require('../middlewares/userMiddlewares')
const productsController = require('../controllers/productsController');

/************ MULTER STORAGE ************/
var storage = multer.diskStorage({

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            cb(null, 'public/images/delete')
        }else{
            cb(null, 'public/images/products')
        }
    }
})
var upload = multer({ storage: storage });

/* GET - All products */
router.get('/', productsController.root);

/* GET - Product category */
router.get('/category/:productCategory/', productsController.category);

/* GET - Product subcategory */
router.get('/subCategory/:productSubCategory/', productsController.subCategory);

/* GET - products on-sale */
router.get('/sale/', productsController.sale);

/* GET - Product detail */
router.get('/detail/:productId/', productsController.detail);

/************ CREATE ONE PRODUCT ************/
/* GET - Form to create */
router.get('/create/', userMiddlewares.admin, productsController.create);

/* POST - Store in Data Base */
router.post('/create/', upload.any(),[
    check('name').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('mainPick').custom(function (value, { req }) {
                let ext
                if(req.files.length==0){
                    return false
                }else{
                    ext = path.extname(req.files[0].filename).toLowerCase();
                }
                console.log(ext);
                if (
                    ext == ".jpg" ||
                    ext == ".jpeg" ||
                    ext == ".png" ||
                    ext == ".gif"){
                        return true;
                    }
                    return false;
            }).withMessage('Imágen obligatoria - Solo archivos JPG, JPEG, PNG o GIF')
        ], productsController.store);

/************ EDIT ONE PRODUCT ************/
/* GET - Form to edit */
router.get('/edit/:productId', userMiddlewares.admin, productsController.edit);
/* PUT - Update in Data Base */
router.put('/edit/:productId', upload.any(),[
    check('name').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('mainPick').custom(function (value, { req }) {
                let ext
                if(req.files.length==0){
                    return false
                }else{
                    ext = path.extname(req.files[0].filename).toLowerCase();
                }
                console.log(ext);
                if (
                    ext == ".jpg" ||
                    ext == ".jpeg" ||
                    ext == ".png" ||
                    ext == ".gif"){
                        return true;
                    }
                    return false;
            }).withMessage('Imágen obligatoria - Solo archivos JPG, JPEG, PNG o GIF')
        ], productsController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:productId', userMiddlewares.admin, productsController.destroy);

module.exports = router;