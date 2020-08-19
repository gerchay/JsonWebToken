const express = require('express')
const cors = require('cors');
const app = express()

require('./database');

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api',require('./routes/indexRoute'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));