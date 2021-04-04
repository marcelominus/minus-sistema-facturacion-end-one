//Importamos EXPRESS
const express = require('express');
//Importamos las variables de entorno
require('dotenv').config({ path : './const.env'});
//Importamos la variable de APP
const app = require('./app');
//Importamos la configuraciones de base de datos
const db = require('./config/databases/configDataBase');

///===================================================
//Verificamos las conexion con la base de datos
db.sync()
    .then(() => console.log("CONEXION CORRECTA BASE DE DATOS FUNCIONANDO"))
    .catch((error) => console.log(error));

//Invocamos las variables de entorno para el PUERTO
const PORT_SERVER = process.env.PORT_SERVER;
const VERSION = process.env.VERSION;

//Habilitamos el PUERTO de escucha y levantamos el servicio
app.listen( PORT_SERVER, () => {
    console.log(`==== Version de Programa ${VERSION} ====`)
    console.log(`Servicio funcionando por el puerto ${PORT_SERVER}`);
})
