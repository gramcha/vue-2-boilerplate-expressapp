/**
 * Created by gramachandran on 13/11/17.
 */
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const devserver = require('./build/dev-server-integration');
const index = require('./routes/index');

const app = express();

// app.get('/', (req, res) => res.send('Hello World!'))
console.log(`process env = ${process.env.NODE_ENV}`);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
if (process.env.NODE_ENV === 'development') {
  app.use('/', devserver());
} else {
  console.log('runing prod environment');
  app.use('/', index);
  // serve static files like css and other js files.
  app.use(express.static(path.join(__dirname, 'dist')));
// view engine setup
  app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'jade');
  app.set('view engine', 'html');
// Set HTML engine
  app.engine('html', ejs.renderFile);
}

