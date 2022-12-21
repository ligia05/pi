const express = require('express');
const path = require('path');const createError = require('http-errors');
const session= require('express-session')
const method= require ('method-override')
const cookieParser = require('cookie-parser');

const acesso= require('./Middlewares/acesso');
const UsuarioLogado = require('./middlewares/validador');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
  secret:"SEGREDO"
}))
app.use(method('_method'));
app.use(function(req,res,next){
  res.locals.clientes=req.session.clientes
  res.locals.caminho=req.path
  next()
})



const loja = require('./Router/homeRouter');
const adm = require('./Router/admRouter');
const itens = require('./Router/itensRouter');
const clientes= require('./Router/clienteRouter');
const home = require('./Router/homeRouter');
//const usersRouter = require('./Router/user');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(acesso);

app.use('/', home);
app.use('/', home);
app.use('/', loja);
app.use('/adm', adm);
app.use('/adm', clientes);


//app.use('/users', usersRouter);





app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
