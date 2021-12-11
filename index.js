const express = require('express');
const cors = require('cors')
const routes = require('./routes/routes');

require('dotenv').config({path: './config/.env'});
// app.use(cors())
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
