var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;


var listingSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String,
  updated_at: Date,
  created_at: Date
});

listingSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at) this.created_at = currentDate;
  next();
});

listingSchema.pre('findOneAndUpdate', function(){
  this.update({}, { $set: { updated_at: new Date() } });
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
