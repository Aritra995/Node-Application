const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

const mongoose = require('mongoose');
const leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
    leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.post((req,res,next) => {
    leaders.create(req.body)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    leaders.remove({},{ useFindAndModify : false })
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(res);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
});



leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported');
})
.put((req,res,next) => {
    leaders.findByIdAndUpdate(req.params.leaderId,{
        $set : req.body
    },{
        new : true,
        useFindAndModify : false
    })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.delete((req,res,next) => {
    leaders.findByIdAndRemove(req.params.leaderId,{ useFindAndModify : false })
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(res);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
});

module.exports = leaderRouter;