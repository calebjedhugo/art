const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT;

app.use(cors());
app.use(require('./middleware'))
app.use(require('./routes'))

app.use((req, res) => {
  console.log(`${req.originalUrl} was requested and a 404 was returned`)
  res.status(404).json(`${req.originalUrl} could not be found.`)
})

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
