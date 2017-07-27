
import express from 'express';
import Logger from '../helpers/logger';

import Measurement from '../schemas/measurements';

const router = express.Router();


// api endpoints
router.get('/', (req, res) => {

  let query = {};
  if (req.query.station) query.station = req.query.station;
  // query.published = true;

  Measurement
    .find(query)
    .sort('-date')
    .limit(50)
    .exec((err, data) => {
      
      if (err) {
        Logger.log(err);
        res.sendStatus(500);
      }
      
      else {
        
        let response = {};
        let resArray = [];
        data.forEach(measurement => {
          
          let categories = {};
          measurement.items.forEach(item => {
            categories[item.group] = categories[item.group] || { date: measurement.date, station: measurement.station, value: 0, items: [] };
            categories[item.group].value += item.value;
            categories[item.group].items.push({ type: item.type, value: item.value });
          });
          
          Object.keys(categories).forEach(cat => {
            response[cat] = response[cat] || [];
            categories[cat].items.sort((a,b) => (a.value < b.value));
            response[cat].push(categories[cat]);
          });
        });
  
        Object.keys(response).forEach(cat => {
          resArray.push({ name: cat, measurements: response[cat] });
        });
        
        res.json(resArray);
      }
    });
});

export default router;
