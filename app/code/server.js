/**
 * The main server file.
 *
 * Replace this with whatever it is your application does.
 */

(function () {
  'use strict';
  const express = require('express');

  // Constants.
  const PORT = 8080;
  const HOST = '0.0.0.0';

  // App.
  const app = express();
  app.get('/', (req, res) => {
    res.send('Hello world, I am the Dcycle Node.js Starterkit.\n');
  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
}());
