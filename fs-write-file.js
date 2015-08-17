var fs = require("fs");
var zip = new require('node-zip')();


var fs = require("fs");
zip.file('text.txt');
var data = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync('test.zip', data, 'binary');