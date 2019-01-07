const express = require('express');
const path = require('path');
const app = express();

console.log (__dirname);

app.use(express.static(path.join(__dirname, 'myreact')));

app.get('/myreact', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000);
