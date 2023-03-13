const mongoose = require('mongoose');
const { config } = require('../config/secret');


main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.hkvob2m.mongodb.net/fullstack23`);
  console.log("caught that slippery mongoose in Belgium");
  // await mongoose.connect('mongodb://127.0.0.1:27017/fullstack23');
  //console.log("caught that slippery mongoose");
  
}