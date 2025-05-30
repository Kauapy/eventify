require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const envContent = fs.readFileSync(path.join(__dirname, '.env')).toString();

const app = express();
app.use(cors());
app.use(express.json())

console.log("Conteúdo do .env:", envContent);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log("🔍 MONGO_URL carregada:", process.env.MONGO_URL);

console.log("🔍 MONGO_URL carregada:", process.env.MONGO_URL);

app.use('/auth', authRoutes);;
app.use('/events', eventRoutes);

app.get('/', (req, res) => {
  res.send("🚀 API funcionando!");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Banco de Dados conectado!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000!");
});

