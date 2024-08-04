const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const ImageModel=require('./models/image.models')


app.set('view engine','ejs')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/allimage', async (req, res) => {
    try {
        const images = await ImageModel.find(); 
        res.render('image', {images}); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImage = new ImageModel({
            filename: req.file.filename,
            originalName: req.file.originalname,
            imagePath: req.file.path
        });
        await newImage.save();
       res.redirect('/allImage')
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3000, () => {
    console.log('Server is running');
});
