const express = require("express");
const app = express();
const { connectToDB  } = require("./db");
const router = require('../server/routers/user-routes')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router);

connectToDB( (db) => {
  //console.log("Db", db);
  app.listen(8080, console.log("server running"));
})
  .then( console.log("listening further"))
  .catch((err) => console.dir(err));

// console.log(db, "any");


