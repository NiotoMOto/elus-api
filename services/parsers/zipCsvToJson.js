const download = require('../download');
const datas = require('../../config/assembleDatas.js');
const AdmZip = require('adm-zip');
const fs = require('fs');
const Deputes = require('mongoose').model('Elus');
const Converter = require("csvtojson").Converter;
const Promise = require('bluebird');
const converter = new Converter({
  delimiter: ';',
  flatKeys: true
});

function zipCsvToJson(description, callback) {
  return download(description, './tmp/archives')
    .then(function(file) {
      const zipFile =  new AdmZip(file);
      const path = `./datas/${description.name}`;
      zipFile.extractAllTo(path, true);
      const files = fs.readdirSync(path);
      var fileStream = fs.createReadStream(`${path}/${files[0]}`);
      converter.on("end_parsed", function (jsonObj) {
        callback(jsonObj);
      });
      return fileStream.pipe(converter);
      // converter.fromFile(`${path}/${files[0]}` ,function(err,result) {
      //   return JSON.parse(result);
      // });
    })
    .catch(function(err){
      console.log('errrr scv', err.stack);
    });
}

module.exports = zipCsvToJson;
