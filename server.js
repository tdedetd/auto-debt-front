const express = require('express');

const app = express();

app.use(express.static('./dist/auto-debt-front'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {
    root: 'dist/auto-debt-front/'
  }),
);

app.listen(process.env.PORT || 8080);
