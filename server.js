const express = require('express');
const bodyParser = require('body-parser');

// PORT ENV
const port = process.env.PORT || 5000;

const app = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get '/'
app.get('/api', (req, res, next) => {
    return res.send({
        success: true,
        message: "Successfully Done."
    })
})

// Post '/upload'
app.post('/api/upload', (req, res, next) => {
    console.log(req.files)
  })

app.listen(port, () => console.log(`Server listening on ${port}`));
