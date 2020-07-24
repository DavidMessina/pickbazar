// ************ Require's ************
var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const userMiddlewares = require('../middlewares/userMiddlewares');
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const bcrypt = require('bcrypt');
const db = require("../database/models")

const path = require('path');
const fs = require('fs');

//const usersDB = path.join(__dirname, '../data/usersDB.json');
//let users = JSON.parse(fs.readFileSync(usersDB, 'utf-8'));

/************ MULTER STORAGE ************/
var storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            cb(null, 'public/images/delete')
        }else{
            cb(null, 'public/images/users')
        }
    },
    
    
})
var upload = multer({ storage: storage/*, fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }*/ });

/************ LOGIN USER ************/
/* GET - Form to login */
router.get('/login/', userMiddlewares.gest, usersController.login);

/* POST - Process login form */
router.post('/login/', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
], usersController.processLogin);

/* POST - Process logout */
router.post('/logout/', usersController.logout);

/* GET - User profile */
router.get('/profile/', userMiddlewares.auth, usersController.profile);

/************ CREATE ONE USER ************/
/* GET - Form to create */
router.get('/register/', userMiddlewares.gest, usersController.register);

/* POST - Store in Data Base */

db.User.findAll()
    .then((users) => {
        router.post('/register/', upload.any(), [
            check('firstName').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            check('lastName').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            check('email').isEmail().withMessage('Debe ingresar un Email valido'),
            check('phone').isInt().withMessage('Debe ingresar solo numeros'),
            check('phone').isLength({ min: 8, max: 10 }).withMessage('El teléfono debe tener 10 dígitos e incluir el código de area'),
            check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
            body('email').custom(function (value) {
                let contador = 0;
                for (let i = 0; i < users.length; i++) {
                    //console.log(value);
                    if (users[i].email == value && users[i].state == 1) {
                        contador++;
                    }
                }
                if (contador > 0) {
                    return false;
                } else {
                    return true;
                }
            }).withMessage('Usuario existente'),

            body('passwordConfirm').custom(function (value, { req }) {
                let pass = req.body.password;
                //console.log(pass);
                if (pass != value) {
                    return false
                }
                return true;
            }).withMessage('Las contraseñas no coinciden'),

            body('avatar').custom(function (value, { req }) {
                let ext
                if(req.files.length==0){
                    return true
                }else{
                    ext = ""+path.extname(req.files[0].filename).toLowerCase();
                }
                //console.log(ext);
                if (
                    ext == ".jpg" ||
                    ext == ".jpeg" ||
                    ext == ".png" ||
                    ext == ".gif"){
                        return true;
                    }
                    return false;
            }).withMessage('Solo archivos JPG, JPEG, PNG o GIF')
        ], usersController.store);
    })
    .catch((errors) => {
        console.log(errors);
    })


/************ EDIT ONE USER ************/
/* GET - Form to edit */
router.get('/edit', userMiddlewares.auth, usersController.edit);

/* PUT - Update in Data Base */

db.User.findAll()
    .then((users) => {
        router.put('/edit', upload.any(), [
            check('firstName').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            check('lastName').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            check('email').isEmail().withMessage('Debe ingresar un Email valido'),
            check('phone').isInt().withMessage('Debe ingresar solo numeros'),
            check('phone').isLength({ min: 8, max: 10 }).withMessage('El teléfono debe tener 10 dígitos e incluir el código de area'),
            check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
            body('email').custom(function (value, { req }) {
                let contador = 0;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == value && req.session.userFound[0].email != value) {
                        contador++;
                    }
                }
                if (contador > 0) {
                    return false;
                } else {
                    return true;
                }
            }).withMessage('Usuario existente'),
            
            body('passwordConfirm').custom(function (value, { req }) {
                let pass = req.body.password;
                //console.log(pass);
                if (pass != value) {
                    return false
                }
                return true;
            }).withMessage('Las contraseñas no coinciden'),

            body('avatar').custom(function (value, { req }) {
                let ext
                if(req.files.length==0){
                    return true
                }else{
                    ext = ""+path.extname(req.files[0].filename).toLowerCase();
                }
                                
                //console.log(ext);
                if (
                    ext == ".jpg" ||
                    ext == ".jpeg" ||
                    ext == ".png" ||
                    ext == ".gif"){
                        return true;
                    }
                    return false;
            }).withMessage('Solo archivos JPG, JPEG, PNG o GIF')
        ], usersController.update);
    })
    .catch((errors) => {
        console.log(errors);
    })

/************ CHANGE USER TO CATEGORY INACTIVE ************/
/* DELETE - Change user category to inactive */
router.delete('/delete', usersController.destroy);

module.exports = router;