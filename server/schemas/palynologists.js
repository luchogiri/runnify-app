
import mongoose, { Schema } from 'mongoose';

// ---- model -----

const Palynologist = new Schema({

  name: String,
  phone: String,
  email: String,
  password: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});

export default mongoose.model('Palynologist', Palynologist);
