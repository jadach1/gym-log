const USER = require('../models/User')

exports.getUsers = async (req, res, next) => {
     const users = await USER.findAllUsers().then(res => {return res;})
      res.status(201).json(users)
}

exports.newUser = (req, res, next) => {
    const name = req.body.email;
    const password = req.body.password;
    
    // is valid email address
    // check for duplicate email
    
    /*
        user.findONe.then( user => if(user) {
            redirect signup
        })

        create new user
    */
}

exports.getUser =  async (req, res) => {
   // const name = req.body.username || "";
    // const password = req.body.password || "";
    console.log(req.body, "body")
    const user =  await USER.findUser("jacob", "root");
    if (user) {
        console.log(user, "user")
        res.status(201).json({user: "jacob"});
    } else {
        return res.status(500).json({error: "We could not find the user"})
    }
}