
import mongoose, { Schema } from 'mongoose';

// ---- model -----

const Account = new Schema({

  first_name: String,
  last_name: String,
  email: String,
  password: String,
  picture: String,

  fb_token: String,
  preferences: {
    station: String,
    types: [{ name: String }]
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});


export default mongoose.model('Account', Account);
