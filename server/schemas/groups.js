
import mongoose, { Schema } from 'mongoose';

// ---- model -----

const Group = new Schema({

  name: String,
  levels: {
    min: Number,
    low: Number,
    high: Number,
    max: Number
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false }

});

export default mongoose.model('Group', Group);
