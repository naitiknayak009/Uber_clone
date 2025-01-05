const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register' ,
     // body('name').isString().isLength({min:3}),
     // body('email').isEmail(),
     // body('password').isString().isLength({min:8}),
     // body('socketId').isString().isLength({min:3}),
     // body('vehicle.color').isString().isLength({min:3}),
     // body('vehicle.plate').isString().isLength({min:3}),
     // body('vehicle.capacity').isNumeric(),
     // body('vehicle.vehicleType').isString().isIn(['car','motorcycle','auto']),
     // body('location.lat').isNumeric(),
     // body('location.lng').isNumeric(),
     captainController.registerCaptain

)


module.exports = router;