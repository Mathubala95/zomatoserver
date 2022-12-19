var express = require('express');
const { connectDb, closeConnection } = require('../../config');
const { authenticate } = require('../../lib/authorize');
var router = express.Router();
const mongodb = require("mongodb");


/* GET users listing. */
router.get('/',  async function(req, res, next) {
    try{
        const db = await connectDb();
        let restraunts = await db.collection("restraunts").find().toArray();
        await closeConnection()
        res.json(restraunts);
    } catch (error){
        res.status(500).json({message : "Something went wrong"});
    }
});

router.post('/create', authenticate, async function(req, res, next) {
    try{
        const db = await connectDb();
        await db.collection("restraunts").insertOne(req.body);
        res.json({message : "Restraunt Created Successfully"});
        await closeConnection()
    } catch (error){
        res.status(500).json({message : "Something went wrong"});
        // set the token in postman header in /admin/restraunt/create
    }
});

router.post('/dish/:rId',authenticate,async function(req, res, next) {
    try{
        const db = await connectDb();
        // const restraunt = await db.collection("restraunts").findOne({_id : mongodb.ObjectId(req.params.rId)});
        // if(restraunt){
        //     console.log(restraunt)
        // }
        await db.collection("dishes").insertOne({rId : mongodb.ObjectId(req.params.rId), ...req.body});
        res.json({message : "Dishes Created Successfully"});
        await closeConnection()
    } catch (error){
        res.status(500).json({message : "Something went wrong"});
        // set the token in postman header in /admin/restraunt/create
    }
});

router.get('/dish/:rId',authenticate,async function(req, res, next) {
    try{
        const db = await connectDb();
        // const restraunt = await db.collection("restraunts").findOne({_id : mongodb.ObjectId(req.params.rId)});
        // if(restraunt){
        //     console.log(restraunt)
        // }
        const dishes = await db.collection("dishes")
        .find({rId : mongodb.ObjectId(req.params.rId)}).toArray();
        res.json(dishes);
        await closeConnection()
    } catch (error){
        res.status(500).json({message : "Something went wrong"});
        // set the token in postman header in /admin/restraunt/create
    }
});

module.exports = router;

