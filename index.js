const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cards = require('./routes/cards');
const collections = require ('./routes/collections');
connectDB();

app.use(express.json());
app.use('/api/cards', cards);
app.use('/api/collections', collections);

const port = process.env.port || 5000;
app.listen(port,() => {
    console.log(`Server started on port: ${port}`);
});