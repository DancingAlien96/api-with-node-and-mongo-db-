const express = require('express');
require('dotenv').config();
const app = express();
const dbConnect = require('./config/database');
const cors = require('cors');


app.use(cors());


dbConnect()


//cuidado donde se ubica la carpeta storage
app.use(express.static('src/storage'));

app.use(express.json());

//importacion del puerto de la variable de entorno
const port = process.env.PORT || 4000;


//usar las rutas
app.use('/api', require('./routes/'));


app.listen( port, ()=>{
    console.log(`Server is working on ${port} port`);
})

