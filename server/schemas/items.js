
import { Schema } from 'mongoose';

// ---- model -----

const Item = new Schema({

  group: { type: String },
  scientific: { type: String },
  type: { type: String },
  value: { type: Number }

});

export default Item;
