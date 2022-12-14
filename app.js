const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session= require('express-session')
const method= require ('method-override')
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const loja = require('./Router/homeRouter');
const adm = require('./Router/admRouter');

const clientes= require('./Router/clienteRouter');
const home = require('./Router/homeRouter');
const acesso= require('./Middlewares/acesso');
const UsuarioLogado = require('./middlewares/validador');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', loja);
app.use('/', home);

app.use('/adm', adm);
app.use('/adm', clientes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error')

});

//const usersRouter = require('./Router/user');



// view engine setup




//app.use('/users', usersRouter);





app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
