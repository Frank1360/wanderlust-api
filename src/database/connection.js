const mongoose = require('mongoose');


const connection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB,{});

        console.log('Base de datos conectada.');
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectar la base de datos.');
    }
}


module.exports = {
    connection
}