const download = require('../download');
const datas = require('../../config/assembleDatas.js');
const AdmZip = require('adm-zip');
const fs = require('fs');
const Deputes = require('mongoose').model('Elus');
const Promise = require('bluebird');

function zipToJson(description) {
  return download(description, './tmp/archives')
    .then(function(file) {
      const zipFile =  new AdmZip(file);
      const path = `./datas/${description.name}`;
      zipFile.extractAllTo(path, true);
      const files = fs.readdirSync(path);
      const data = fs.readFileSync(`${path}/${files[0]}`, 'utf8');
      return JSON.parse(data);
    })
    .catch(function(err){
      console.log(err.stack);
    });
}

module.exports = zipToJson;
