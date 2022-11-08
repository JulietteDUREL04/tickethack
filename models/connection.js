const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:tL9jSow5fu8mByrk@cluster0.mlghbux.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
