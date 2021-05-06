let mongoose = require('mongoose');

let schoolSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    name:{
        type: mongoose.Schema.Types.String,
    }
});

module.exports = mongoose.model('School', schoolSchema);

