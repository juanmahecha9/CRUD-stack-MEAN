const express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan');
const config = require('../config.json');

const app = express();

const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1';
// bind restriccion ip
/* La IP 127.0.0.1 hace referencia al localhost, un host es cualquier equipo o servidor, así que el host local es cualquiera que estés usando. */


//Conexion a mongoDB
const url = config.database.mongodb.url;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Success, conncection mongoDB'))
    .catch(err => console.log(err));

// rutas	
const indexRoutes = require('./routes/index');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    /* Voy a tener acceso, control, seguimiento y origen de todos los datos que van a ingresar a la API */

    res.header('Access-Control-Allow-Headers', config.access.cookies);
    /* Acceso a todos los metadatos- cookies */

    res.header('Access-Control-Allow-Methods', config.access.method);
    /* Acceso a todos los metodos http- metodos de peticio */

    res.header('Allow', config.access.method);
    /* Confirmacion estricta de los metodos a utilizar */

    next();
})




//middlewares	
//intercambio de informacion entre apps	
app.use(express.json());
app.use(morgan('dev'));

// routes	
app.use('/router', indexRoutes);




app.listen(port, bind, () => {
    console.log(`Server on port ${config.app.port}`);
    console.log(`Bind ${config.app.bind}`);
    console.log('***********************');
    console.log(`http://localhost:${config.app.port}/`)
});

