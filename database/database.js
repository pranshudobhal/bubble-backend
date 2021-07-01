const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connection to database is successful!!');
  } catch (error) {
    console.log('Error connecting to database!!!');
  }
}

module.exports = { connectToDatabase };
