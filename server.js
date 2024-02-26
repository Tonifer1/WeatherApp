const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=604800');
  next();
});
app.use((req, res, next) => {
  res.setHeader('x-content-type-options', 'nosniff');
  next();
});



