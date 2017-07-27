
import mongoose, { Schema } from 'mongoose';

import Item from './items';

// ---- model -----

const Measurement = new Schema({

  date: Date,
  author: String,
  station: String,
  items: [Item],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }

});

export default mongoose.model('Measurement', Measurement);
