
const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_P}@cluster0.iyyptri.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://jacob:Reinhardt876@cluster0.iyyptri.mongodb.net/?retryWrites=true&w=majority`;
let db; // will host db connection

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect(callback) {
  try {
    // Send a ping to confirm a successful connection
    await client.db("gym").command({ ping: 1 });
    await client.db("gym").collection("users").find({username: "jacob"}).next().then( res => console.log(res)).catch( err => console.log(err));
    db = client.db("gym");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    callback(db);
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("closing connection")
   // await client.close();
  }
}

function getDatabase() {
  if(db){  console.log("found db in db.js"); return db;}
  else console.log("could not find db")
}

exports.connectToDB = connect;
exports.db = getDatabase; 
