// @flow

import express from 'express';
import Logger from '../helpers/logger';

import Measurement from '../schemas/measurements';

const router = express.Router();

// api endpoints
router.get('/', (req, res) => {
  Measurement
    .find()
    .sort('-date')
    .exec((err, data) => {
      
      if (err) {
        Logger.log(err);
        res.sendStatus(500);
      }
      
      else {
        res.json(data);
      }
    });
});


router.post('/', (req, res) => {
  let model = new Measurement(req.body);
  model.save((err, model) => {
    
    if (err) {
    
      Logger.log(err);
      res.sendStatus(500);
      
    }
    
    else {
      
      Logger.log('saved successfully:', model);
      res.json(model);
    }
  });
});


router.get('/:id', (req, res) => {
  Measurement
    .findOne({ _id: req.params.id })
    .exec((err, model) => {
      
      if (err) {
        
        Logger.log(err);
        res.sendStatus(500);
      }
      
      else {
        res.json(model);
      }
    });
});


router.put('/:id', (req, res) => {
  Measurement
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .exec((err, model) => {
      
      if (err) {
        Logger.log(err);
      }
      
      else {
        res.json(model);
      }
    });
});


router.delete('/:id', (req, res) => {
  Measurement
    .findByIdAndRemove(req.params.id)
    .exec((err, response) => {
      
      if (err) {
        Logger.log(err);
        res.sendStatus(500);
      }
      
      else res.sendStatus(200);
    });
});


export default router;