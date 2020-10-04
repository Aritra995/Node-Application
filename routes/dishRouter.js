const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all dishes to you!');
})
.post((req,res,next) => {
    res.end(`Will add dish : ${req.body.name} with details : ${req.body.description}`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end('Will send the details of the dish: '+req.params.dishId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported');
})
.put((req,res,next) => {
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.end(`Will update the dish ${req.params.dishId} with ${req.body.name} and description: ${req.body.description}`);
})
.delete((req,res,next) => {
    res.end('Deleting dish: '+req.params.dishId);
});

module.exports = dishRouter;