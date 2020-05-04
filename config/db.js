const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(
      `mongoDB connected:${conn.connection.host}`
    );
  } catch (err) {
    console.log(`error:${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;