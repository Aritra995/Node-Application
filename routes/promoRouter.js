const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

const mongoose = require('mongoose');
const promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next) => {
    promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err) => { next(err) })
    .catch((err) => { next(err) });
})
.post((req,res,next) => {
    promotions.create(req.body)
    .then((promotion) => {
        console.log('Created Promotion : ',promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err) => { next(err) })
    .catch((err) => { next(err) });
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    promotions.remove({})
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(res);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
});



promoRouter.route('/:promoId')
.get((req,res,next) => {
    promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported');
})
.put((req,res,next) => {
    promotions.findByIdAndUpdate(req.params.promoId,{
        $set : req.body
    },{
        new : true,
        useFindAndModify : false
    })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
})
.delete((req,res,next) => {
    promotions.findByIdAndRemove(req.params.promoId,{ useFindAndModify : false})
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(res);
    },(err)=> { next(err) })
    .catch((err) => { next(err) });
});

module.exports = promoRouter;