import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI;
if(!mongodb_uri){
  throw new Error(' Please define the MONGODB_URI environment variable');
}

let cached = global.mongooseConnectionCache;
if(!cached){
  cached = {conn : null,promise:null}; // defining global varaible
  global.mongooseConnectionCache = cached; 
}

export async function connectToDatabase(){
  if(cached.conn) return cached.conn;
  if(!cached.promise) {
    cached.promise = mongoose.connect(mongodb_uri, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log("✅ Connected to MongoDB");
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;  //This means cached.conn will contain the resolved value of the promise returned by mongoose.connect(), which is a Mongoose connection object.
  return cached.conn;
}



//  DO NOT do this inside routes:
// await mongoose.connect(MONGODB_URI); // each time: opens a new connection
