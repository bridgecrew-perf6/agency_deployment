import express from "express";
import router from "./routes/index.js";
import db from './config/db.js'
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});


const app = express();

// conectar la base de datos
db.authenticate()
        .then( ()=> console.log('base de datos conectada')) //en caso de estar conectada
        .catch(error => console.log(error)) // en caso de dar error al conectar




// habilitar PUG 
app.set('view engine', 'pug');

// obtener el year actual 
app.use( (req, res, next)=>{
        const year = new Date();

        res.locals.actualYear = year.getFullYear();
        res.locals.nombreSitio = 'Agencia de Viajes';
        next();
})

//  agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// definir la carpeta Public
app.use(express.static('public'));

// agregar router
app.use('/', router);

//  puerto y host para la app 

// definir puerto 
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, ()=> {
        console.log(`el servidor esta funcionando correctamente en el puerto ${port}`)
})