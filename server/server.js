const path = require('path');
const express = require('express');


var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

console.log(__dirname + './../public');
console.log(publicPath);

var app = express();

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   res.render(publicPath + 'index.html');
// })

app.listen(port, ()=> {
  console.log('server started at port ' + port);
});
