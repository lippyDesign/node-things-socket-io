const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000
const app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
