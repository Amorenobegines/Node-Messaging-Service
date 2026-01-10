import express from 'express';

// Crear el servidor Express



const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;

