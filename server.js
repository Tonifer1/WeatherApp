const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



