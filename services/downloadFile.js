const request = require('request');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const download = function(url, fullPath, callback){
    const p = new Promise(function(resolve, reject){
        const dest = fullPath;
        const writeStream = fs.createWriteStream(dest);

        writeStream.on('finish', function(){
          resolve(dest);
        });
        writeStream.on('error', function(err){
          fs.unlink(dest, reject.bind(null, err));
        });
        const readStream = request.get(url);
        readStream.on('error', function(err){
          fs.unlink(dest, reject.bind(null, err));
        });
        readStream.pipe(writeStream);
    });

    if(!callback)
      return p;

    p.then(function(fileName){
      callback(null, dest);
    }).catch(function(err){
      callback(err);
    });
};

module.exports = download;
