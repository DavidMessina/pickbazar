const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');// Para usar Session
const rememberMiddleware = require('./middlewares/rememberMiddleware');
const db = require('./database/models');
const sequelize = db.sequelize;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({ secret: 'PickbazarSecret' }));
app.use(rememberMiddleware);

app.use(function (req, res, next) {
  res.locals.userFound = req.session.userFound;
  next()
})

app.use(function (req, res, next) {
  db.Category.findAll(
    )
    .then(function (category) {
      res.locals.cat = category
      next()
    })
  })
  
  app.use(function (req, res, next) {
    
    db.Subcategory.findAll(
      {include: [{ association: "Category" }]
    })
    .then(function (subCategory) {
      res.locals.subCat = subCategory
      next()
    })
  })
  
  app.use(function (req, res, next) {
  
    if (req.session.userFound == undefined) {
      next()
    
    } else {
      db.Cart.findOne({
        where: {
          user_id: req.session.userFound[0].id,
          state: 1
        }
      })
      .then((cart) => {
        if (!cart) {
          res.locals.cartItems = 0
          next()
          
        }
        else {
          let cartId = cart.id;
          sequelize.query("SELECT p.id, p.name, cp.cart_id, cp.price, cp.discount, cp.subtotal, cp.units, c.total, c.state, i.name as image, c.updated_at FROM carts as c LEFT OUTER JOIN (cart_product as cp INNER JOIN products as p ON p.id = cp.product_id) ON c.id = cp.cart_id INNER JOIN images as i ON i.product_id=p.id WHERE i.main=1 and c.id=" + cartId)
          
          .then((cartProducts) => {
              res.locals.cartItems = cartProducts[0].length;
              next()
            })
        }        
      })
    }
  })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
