// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// não é necessário adicionar a extensão do ficheiro, como é possível ver em baixo

// routes caminhos para controlar scores
const scoresRoutes = require('./routes/scores');

app.use(cors());
app.use(express.json());

//utilizar as routes para os scores
app.use('/api/scores', scoresRoutes);

app.get('/', (req, res) => {
  res.send('Olá com Express!');
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
