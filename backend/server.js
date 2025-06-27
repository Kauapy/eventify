require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

console.log("🔍 Carregando rotas...");
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');

const envContent = fs.readFileSync(path.join(__dirname, '.env')).toString();
console.log("Conteúdo do .env:", envContent);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log("🔍 MONGO_URL carregada:", process.env.MONGO_URL);

console.log("🔍 Registrando rotas...");
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send("🚀 API funcionando!");
});

app.get('/test', (req, res) => {
  res.json({ mensagem: "Servidor funcionando!", timestamp: new Date() });
});

app.use((req, res) => {
  console.log(`❌ Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ erro: "Rota não encontrada" });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Banco de Dados conectado!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000!");
  console.log("🔍 Teste em: http://localhost:3000/test");
});