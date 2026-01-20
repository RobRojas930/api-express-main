const express = require('express');
const db = require('./db');
require('dotenv').config();
const cors = require('cors');
const routerApi = require('./app/network/index');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./app/network/middlewares/error.handler');
const { DBURL } = require('./const.json');
//HACEMOS LA CONEXIÓN
db(DBURL);

const app = express();
const PORT = process.env.PORT || 3000;

//OPCIONES DE LISTA BLANCA (ORIGENES PERMITIDOS) DEL CORS
const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://localhost:3000', 'http://localhost:3001'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors());
app.use(
  express.json(
    { extended: false } // permite codificar matrices y objetos enriquecidos en formato codificado en url
  )
); //Selección de tipo de analisis de datos
app.use(express.static('app/storage')); //Sacarlos Recursos estaticos de esta carpeta

routerApi(app);
app.use(logErrors); //El orden de los use es imPORTante
app.use(boomErrorHandler);
app.use(errorHandler); //Los middlewares de error van despues del routing

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Mi PORT' + PORT);
});
