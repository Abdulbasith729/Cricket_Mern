const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        // Replace `<dbname>` with the actual database name you want to connect to
        const uri = 'mongodb://localhost:27017/mydata';
        await mongoose.connect(uri, {
        });
        
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

module.exports = connectdb;
