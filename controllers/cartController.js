const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require("../database/models")
const { Op } = require("sequelize");
let sequelize = db.sequelize;

//const cartDB = path.join(__dirname, '../data/cartDB.json');
//let cart = JSON.parse(fs.readFileSync(cartDB, 'utf-8'));

const controller = {
    
    create: function (req, res, next) {
        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {
            let productId = req.params.id;
            var cartId;
            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1,
                }
            })
            .then((cart) => {
                if (cart) {
                    cartId = cart.id;
                    db.Product.findByPk(productId)
                    .then((product) => {
                        db.Cart_product.create({
                            units: req.query.item,
                            price: product.price,
                            discount: product.discount,
                            subtotal: (product.price*req.query.item)-((product.price*req.query.item)*product.discount/100),
                            cart_id: cartId,
                            product_id: productId,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                } else {
                    db.Cart.create({
                        user_id: req.session.userFound[0].id,
                        total: 0,
                        state: 1
                    })
                    .then((cartCreated) => {
                        cartId = cartCreated.id;
                        db.Product.findByPk(productId)
                        .then((product) => {
                            db.Cart_product.create({
                                units: req.query.item,
                                price: product.price,
                                discount: product.discount,
                                subtotal: (product.price*req.query.item)-((product.price*req.query.item)*product.discount/100),
                                cart_id: cartId,
                                product_id: productId,
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                res.redirect('/products');
                //res.redirect('/cart');
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },

    show: function (req, res, next) {
        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {
            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1
                }
            })
            .then((cart) => {
                //console.log(cart);
                if (cart) {
                    let cartId = cart.id;
                    sequelize.query("SELECT p.id, p.name, cp.cart_id, cp.price, cp.discount, cp.subtotal, cp.units, c.total, c.state, i.name as image, c.updated_at FROM carts as c LEFT OUTER JOIN (cart_product as cp INNER JOIN products as p ON p.id = cp.product_id) ON c.id = cp.cart_id INNER JOIN images as i ON i.product_id=p.id WHERE i.main=1 and c.id=" + cartId)
                    .then((cartProducts) => {
                        if (cartProducts[0] != "") {
                            //console.log("productos carrito");
                            //console.log(cartProducts[0]);
                            //console.log(cartProducts[0].length);
                            let cart = cartProducts[0];
                            res.render('cart', { product: cart, empty: 0 });
                        }
                        else {
                            //console.log("no hay items, solo un carro vacio");
                            res.render('cart', { empty: 1 });
                        }
                    })
                }
                else {
                    //console.log("entro por NULL");
                    db.Cart.create({
                        user_id: req.session.userFound[0].id,
                        total: 0,
                        state: 1
                    })
                    .then((cart) => {
                        res.render('cart', { product: cart, empty: 1 });
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },

    remove: function (req, res, next) {
        
        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {
            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1
                }
            })
            .then((cart) => {
                let cartId = cart.id;
                let productoId = Number(req.params.id);
                db.Cart_product.destroy({
                    where: {
                        product_id: productoId,
                        cart_id: cartId
                    }
                })
                .then((cartProducts) => {
                    
                    res.redirect('/cart');
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },

    plus: function (req, res, next) {
        //agrega un item del carrito
        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {
            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1
                }
            })
            .then((cart) => {
                let cartId = cart.id;
                let productoId = Number(req.params.id);
                db.Cart_product.findOne({
                    where: {
                        product_id: productoId,
                        cart_id: cartId
                    }
                })
                .then((item_carrito) => {
                    let unidades = item_carrito.units + 1;
                    let precio = item_carrito.price;
                    let descuento = item_carrito.discount;
                    let subtotal = (precio * unidades) - (((precio * unidades) * descuento) / 100)
                    db.Cart_product.update(
                        {
                            units: unidades,
                            price: precio,
                            subtotal: subtotal
                        }, {
                            where: {
                                product_id: productoId,
                                cart_id: cartId
                            }
                        })
                        .then((cartProducts) => {
                            res.redirect('/cart');
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            }
        },
        
        minus: function (req, res, next) {
            //elimina un item del carrito
            if (req.session.userFound == undefined) {
                res.redirect('/users/login');
            } else {
                db.Cart.findOne({
                    where: {
                        user_id: req.session.userFound[0].id,
                        state: 1
                    }
                })
                .then((cart) => {
                    let cartId = cart.id;
                    let productoId = Number(req.params.id);
                    
                    db.Cart_product.findOne({
                        where: {
                            product_id: productoId,
                            cart_id: cartId
                        }
                    })
                    .then((item_carrito) => {
                        let unidades = item_carrito.units;
                        let precio = item_carrito.price;
                        let descuento = item_carrito.discount;
                        
                        if (unidades == 1) {
                            res.redirect('/cart/remove/' + productoId);
                            
                        }
                        else {
                            unidades--;
                            db.Cart_product.update(
                                {
                                    units: unidades,
                                    subtotal: (precio * unidades) - (((precio * unidades) * descuento) / 100)
                                }, {
                                    where: {
                                        product_id: productoId,
                                        cart_id: cartId
                                    }
                                })
                                .then((cartProducts) => {
                                    res.redirect('/cart');
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    })
                    
                }
            },
            
            confirm: function (req, res, next) {
                if (req.session.userFound == undefined) {
                    res.redirect('/users/login');
                } else {
                    let subtotal=0
                    db.Cart_product.findAll({
                        where: {
                            cart_id: Number(req.params.id),
                        }
                    })
                    .then((items) => {
                        items.forEach(item => {
                            subtotal = subtotal + Number(item.subtotal);
                        })
                    })
                    .then(()=>{
                        let tax=subtotal*21/100;
                        db.Cart.update({ 
                            state: 0,
                            total: subtotal+tax
                        },
                        {
                            where: {
                                user_id: req.session.userFound[0].id,
                                id: Number(req.params.id),
                            }
                        })
                        .then(() => {
                            res.redirect('/users/profile');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        
                    })
                }
            }
        }
module.exports = controller;