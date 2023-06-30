
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.iyyptri.mongodb.net/?retryWrites=true&w=majority";
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
    // Connect the client to the server	(optional starting in v4.7)
    console.log("ym")
    // Send a ping to confirm a successful connection
    await client.db("gym").command({ ping: 1 });
    db = client.db('gym');
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    callback(db);
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("closing connection")
    //await client.close();
  }
}

function getDatabase() {
  if(db){  console.log("found db"); return db;}
  else console.log("could not find db")
}

exports.connectToDB = connect;
exports.db = getDatabase; 