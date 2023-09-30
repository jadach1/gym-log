/************************  EXERCISES  ******************/

const { query } = require("express");
const USER = require("../models/User");
const mongodb = require("mongodb");

/*CREATE A NEW EXERCISE  */
exports.createSet = async (req, res, next) => {
  const uid = req.session.uid;

  //convert date from milliseconds to string
  const workout = {
    bodypart: req.body.bodypart,
    date: new Date(+req.body.date + 10000000).toISOString().split("T")[0],
    exercise: req.body.exercise,
    weight: req.body.weight,
    metric: req.body.metric,
    description: req.body.description,
    user: new mongodb.ObjectId(req.session.uid),
  };

  const response = await USER.createNewSet(workout);
  if (response.acknowledged)
    res.status(201).json({ message: "Successfully added new exercise" });
  else res.status(422).json({ error: "sorry, couldn't add this exercise" });
};

/*EDIT AN EXERCISE */
exports.editSet = async(req,res)=> {

   //convert date from milliseconds to string
   const workout = {
    bodypart: req.body.bodypart,
    date: new Date(+req.body.date + 10000000).toISOString().split("T")[0],
    exercise: req.body.exercise,
    weight: req.body.weight,
    metric: req.body.metric,
    description: req.body.description,
    user: new mongodb.ObjectId(req.body.username),
    id: new mongodb.ObjectId(req.body.id)
  };
  try {
    const response  = await USER.editSet(workout);
    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    res.status(422).json(error)
  }
}

/*GET EXERCISES  */
exports.getExercises = async (req, res, next) => {
  const uid = new mongodb.ObjectId(req.session.uid);
  const exercise = req.params.exercise || undefined;
  const date = req.params.date || undefined;
  const bodyPart = req.params.bodyPart || undefined;
  const sort = req.params.sortBy || "date";

  //create query for DB
  let query = {user: uid} ;

  //Build a query
  exercise != "all" ? query.exercise = exercise:"";
  //convert date from milliseconds to string
  date != "all" ? query.date = new Date(+date).toISOString().split("T")[0]:"";
  bodyPart != "all" ? query.bodypart = bodyPart:"";

  try {
    console.log(query)
    const response = await USER.getExercises(query,sort);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: error });
  }
};

/*GET SINGLE EXERCISE */
exports.getExerciseById = async(req,res)=>{
  const uid = new mongodb.ObjectId(req.session.uid);
  const exerciseID = new mongodb.ObjectId(req.params.id);
  console.log(exerciseID);
  try {
    const response = await USER.getExerciseById(uid,exerciseID);
    console.log(response);
    res.status(201).json(response);
  } catch (error){
    res.status(422).json({error: error})
  }
}

/*DELETE EXERCISES */
exports.deleteExercise = async(req,res)=> {
  const id = new mongodb.ObjectId(req.params.id);
  const uid = new mongodb.ObjectId(req.session.uid);
  try{
    const response = await USER.deleteExercise(id, uid);
    res.status(201).json(response);
  } catch (error) {
    res.status(422).json({error: error})
  }
}

/*EDIT EXERCISES */

