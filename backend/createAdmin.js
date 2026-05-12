const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const criarAdmin = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL não definido no .env');
    }
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_EMAIL e ADMIN_PASSWORD precisam estar no .env');
    }

    await mongoose.connect(process.env.MONGO_URL);

    const adminExistente = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (adminExistente) {
      console.log('Admin já existe.');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const novoAdmin = new User({
      nome: 'Admin',
      email: process.env.ADMIN_EMAIL,
      senha: hashedPassword,
      role: 'admin',
    });
    await novoAdmin.save();
    console.log('✅ Admin criado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

criarAdmin();
