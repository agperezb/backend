//framework
const  express = require('express');

//conexxion base
const conectarDB = require('./config/db');

//rutas de producto
const producto = require('./routes/producto');
//rutas usuario
const user = require('./routes/user');

const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env'});
//creamos el servidor
const app = express();
app.use(cors());
//conectamos al la BD
conectarDB();

app.use(express.json());
app.use('/api/productos', verifyToken, producto);
app.use('/api/users', user);

app.listen(4000, () => {
    console.log('El servidor esta activo');
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization){
        res.status(401).json({ msg: 'No autorizado' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token ===null) {
        res.status(401).json({ msg: 'No autorizado' });
    }
    const payload = jwt.verify(token, process.env.API_KEY);
    req.userId = payload._id;
    next();
}