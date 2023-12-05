const mongoose = require('mongoose');

// cars schema
const carSchema = mongoose.Schema({
    tag: { type: String },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    image: { type: String },
    url: { type: String },
});  

// constructor for cars documents
const Car = mongoose.model('Car', carSchema);

module.exports = Car;