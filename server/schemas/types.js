
import mongoose, { Schema } from 'mongoose';

// ---- model -----

const Type = new Schema({

  name: String,
  scientific: String,
  group: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false }

});

export default mongoose.model('Type', Type);
