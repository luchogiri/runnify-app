// @flow

import express from 'express';
import Logger from '../helpers/logger';

import Group from '../schemas/groups';
import Type from '../schemas/types';
import Station from '../schemas/stations';

const router = express.Router();

// api endpoints
router.get('/', (req, res) => {
  
  Promise.all([
  
    Station.find({}, '-_id -__v -published -deleted -created_at -updated_at').exec(),
    Group.find({}, '-_id -__v -published -deleted -created_at -updated_at').exec(),
    Type.find({}, '-_id -__v -published -deleted -created_at -updated_at').exec()
  
  ]).then((data) => {
    
    res.json({
      stations: data[0],
      groups: data[1],
      types: data[2]
    })
    
  }, (err) => {
    
    Logger.log(err);
    res.sendStatus(500);
    
  });
});

export default router;
