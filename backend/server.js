const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
  });
}

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('🚀 API Eventify funcionando!');
});

app.get('/test', (req, res) => {
  res.json({ mensagem: 'Servidor funcionando!', timestamp: new Date() });
});

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URL) {
  console.error('❌ MONGO_URL não definido. Verifique o arquivo backend/.env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Banco de dados conectado!'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}!`);
});
