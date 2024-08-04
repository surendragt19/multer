
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/multerImage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    imagePath: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports=Image