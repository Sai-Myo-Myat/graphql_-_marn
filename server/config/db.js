const mongoose = require('mongoose');

const  connectDb = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI);

  console.log("connected with mongodb: : " + connect.connection.host)

}

module.exports = connectDb;