var app = require('./app');
var port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Listening on port ${port}`));