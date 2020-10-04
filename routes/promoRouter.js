const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all promotions to you!');
})
.post((req,res,next) => {
    res.end(`Will add promotion : ${req.body.name} with details : ${req.body.description}`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send the details of the promotion: '+req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported');
})
.put((req,res,next) => {
    res.write(`Updating the promotion: ${req.params.promoId} \n`);
    res.end(`Will update the promotion ${req.params.promoId} with ${req.body.name} and description: ${req.body.description}`);
})
.delete((req,res,next) => {
    res.end('Deleting promotion: '+req.params.promoId);
});

module.exports = promoRouter;