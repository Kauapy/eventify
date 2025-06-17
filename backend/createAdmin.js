require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/eventify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const criarAdmin = async () => {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSOWRD, 10)
    try{
        const adminExistente = await User.findOne({ role: 'admin' });
        if(adminExistente) {
            console.log('Admin já existe');
            return mongoose.connection.close()
        }
        const novoAdmin = new User({
            nome: 'Admin',
            email: process.env.ADMIN_EMAIL,
            senha: hashedPassword,
            role: 'admin'
        });
        await novoAdmin.save();
        console.log('Admin criado com sucesso');
        mongoose.connection.close();
    } catch (error){
        console.error("Erro ao criar admin:", error)
        mongoose.connection.close();
    }
}

criarAdmin();