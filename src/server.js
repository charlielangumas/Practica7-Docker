const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'practica7'
};

app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.query('SELECT 1');

        await connection.end();

        res.sendFile(path.join(__dirname, 'index.html'));

    } catch (error) {
        console.error('Error al conectar con MySQL:', error.message);
        res.status(500).send('Error de conexión con MySQL');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});