
import mongoose, { Schema } from 'mongoose';

// ---- model -----

const Station = new Schema({

  name: String,
  code: String,
  location: {
    type: [Number],
    index: '2d'
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false }

});

export default mongoose.model('Station', Station);
