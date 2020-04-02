const port = process.env.port || 3000;
const express = require('express');
const app = new express();

const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './subidas');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    return res.send("Initial route");
});
app.post('/subir', upload.single('file'), (req, res) => {
    console.log(`${req.hostname}/${req.file.path}`);
    return res.send(req.file);
});
app.listen(port, () => console.log(`Server port ${port}`));