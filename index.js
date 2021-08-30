const  express = require('express');
const conectarDB = require('./config/db');
const producto = require('./routes/producto');
//creamos el servidor
const app = express();

//conectamos al la BD
conectarDB();

app.use(express.json());
app.use('/api/productos', producto);

app.listen(4000, () => {
    console.log('El servidor esta activo');
});