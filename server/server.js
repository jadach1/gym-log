const path = require('path');
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const userRouter = require("../server/routers/user-routes");
const exerciseRouter = require("../server/routers/exercise-routes");
const helmet = require('helmet')
const fs = require('fs')
const morgan = require('morgan')
const https = require('node:https');

// Session and MongoDB
const { connectToDB } = require("./db");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//Logging 
const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_P}@cluster0.iyyptri.mongodb.net/`,
  //uri: `mongodb+srv://root:root@cluster0.iyyptri.mongodb.net/`,
  databaseName: 'gym',
  collection: 'sessions',
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.json());

//Managing Logging
// const accessLogStream = fs.createWriteStream(
//   'publicMenace/access.log', {flags: "a"}
// )
// app.use(morgan('combined', {stream: accessLogStream}));

// Headers for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type,Authorization,X-Requested-With,Set-Cookie,jacob,test"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Session Middleware
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false, store: store})
);

// Route Handler
app.use(userRouter);
app.use(exerciseRouter);

console.log(process.env.PRIVATEKEY);
console.log(process.env.CERTIFICATE);

// SSL/TSL Keys
const options = {
 key: fs.readFileSync(process.env.PRIVATEKEY),
 cert: fs.readFileSync(process.env.CERTIFICATE),
};


// Initial Connection
connectToDB((db) => {
  //console.log("Db", db);
  https.createServer({key: options.key, cert: options.cert}, app)
  .listen(process.env.PORT || 8080, console.log("server running"));
  //app.listen(8080,console.log("listening on 8080 http"))
  //  https.createServer(app)
  // .listen(process.env.PORT || 8080, console.log("server running"));
})
  .then(console.log("listening further"))
  .catch((err) => console.dir(err))
  

