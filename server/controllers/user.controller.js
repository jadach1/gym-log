const bycrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken');
const USER = require("../models/User");
const mongodb = require('mongodb');

exports.getUsers = async (req, res, next) => {
  const users = await USER.findAllUsers().then((res) => {
    return res;
  });
  res.status(201).json(users);
};

exports.newUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log(req.body)
  //Check to see if user exists.
  USER.findUser(username)
    .then((user) => {
      if (user) {
        //Add error display to user
        //Exists so redirect
        return res.status(422).send({error: "User Already Exists.  Bro, do you even lift bro?"});
      } else {
        //Does not exist so create new user
        bycrypt.hash(password, 12, (err, hash) => {
          if (err) {
            return res.status(422).json({error: "Something went wrong in the server."})
          } else {
            return res.status(215).json(USER.newUser(username, hash));
          }
        });
      }
    })
    .catch((err) => {return res.status(422).json({error: "Something went wrong in the server.."})});
};

/**LOG IN METHODS AND SESSION FUNCTIONALITY */

exports.checkIfAuthorised = async (req, res) => {
  console.log("trying sessoin")
  console.log(req.sessionID)
  try {
    console.log("trying sessoin 2")
    const result = await USER.findUserSession(req.sessionID);
    console.log(result.session.user, result.session.level);
    return res.status(254).json({user: result.session.user, level: result.session.level})
  } catch (error) {
    console.log("trying sessoin 3, failure")
    return res.send({result: "No Session Found"})
  }
 
  
}

exports.userLogin = async (req, res) => {

  console.log(req.headers.origin, req.headers.cookie)
  const username = req.body.username || "";
  const password = req.body.password || "";
  
  try {

    //Find user
    const user = await USER.findUser(username);
    
    //check if user exists
    if (user) {
        bycrypt.compare(password, user.password).then((matchResult) => {
            if (matchResult) {
              console.log("password match");
              req.session.uid = user._id;
              req.session.user = user.username;
              req.session.level = user.level;
              req.session.cookie.expires = new Date(Date.now() + 3600000);
              //const token = jwt.sign({ foo: user.username }, 'shhhhh');
              //return res.status(201).cookie('loggedin',token,{expires: new Date(Date.now() + 3600000)}).json({ user: user, Token: token });
              return res.status(201).json({username: user.username,level: user.level})
            } else {
              console.log("password do not match", matchResult, user.password);
              return res.status(422).send({error: "Wrong Password"});
            }
        }).catch(compareErr => {return res.status(422).json({error: compareErr})}); 
    } 
    else 
      {
      return res.status(422).json({ error: "We could not find the user " + username });
       }
  } catch {
    return res.status(422).json({error: "We could not find the user or the server is down"})
  }
};

exports.userLogout = async (req, res) => {
    USER.logout(req.sessionID).then( output => {
      console.log(output);
      return res.status(201).json(output);
    }).catch( err => {
     return res.status(404).json(err);
    })
  
}



