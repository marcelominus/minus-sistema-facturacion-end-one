//Importamos EXPRESS
const express  = require('express');
//Instanciamos APP
const app = express();
//Importamos las variables de entorno\
require('dotenv').config({path : './const.env'});
//Importmaos BODY PARSER
// const bodyparser = require('body-parser');
//Importamos CORS
const cors = require('cors');
//Importamos las RUTAS
const loginRoute = require('./routes/login/loginRoute');
const adminAllUserRoute = require('./routes/adminAllUser/adminAllUserRoute');
const adminBusinessRoute = require('./routes/adminBusiness/adminBusinessRoute');
const adminCompanyRoute = require('./routes/adminCompany/adminCompanyRoute');
const adminDosageRoute = require('./routes/adminDosage/adminDosageRoute');
const adminProductRoute = require('./routes/adminProduct/adminProductRoute');
const adminMeasureRoute = require('./routes/adminProduct/adminMeasureRoute');
const adminBillRoute = require('./routes/adminBill/adminBillRoute');
//=============================================
//Hablitamos el uso de datos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// app.use(forms.array()); 
//Habilitamos el uso de CORS
app.use(cors());

//
app.use("/state", express.static("public"));

//Creamos la direccion de imagen
app.use( '/' , loginRoute());
app.use( '/admin', adminAllUserRoute());
app.use( '/admin-bus', adminBusinessRoute());
app.use( '/admin-com', adminCompanyRoute());
app.use( '/admin-dos', adminDosageRoute());
app.use( '/admin-pro', adminProductRoute());
app.use( '/admin-mea', adminMeasureRoute());
app.use( '/admin-bill', adminBillRoute());
//Exportamos el MODULO DE APP
module.exports = app;

