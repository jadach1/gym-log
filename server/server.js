const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const userRouter = require("../server/routers/user-routes");
const exerciseRouter = require("../server/routers/exercise-routes");

// Session and MongoDB
const { connectToDB } = require("./db");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_P}@cluster0.iyyptri.mongodb.net/`,
  databaseName: 'gym',
  collection: 'sessions',
});


app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

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

// Initial Connection
connectToDB((db) => {
  //console.log("Db", db);
  app.listen(process.env.PORT || 8080, console.log("server running"));
})
  .then(console.log("listening further"))
  .catch((err) => console.dir(err))
  

