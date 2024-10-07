// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint API para el timestamp
app.get('/api/:date?', (req, res) => {
  let date;
  
  if (!req.params.date) {
    // Si no se proporciona fecha, usar la fecha actual
    date = new Date();
  } else {
    // Intentar parsear la fecha proporcionada
    const paramDate = req.params.date;
    
    // Comprobar si es un timestamp Unix (número entero)
    if (/^\d+$/.test(paramDate)) {
      date = new Date(parseInt(paramDate));
    } else {
      date = new Date(paramDate);
    }
  }

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    res.json({ error: "Fecha inválida." });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
