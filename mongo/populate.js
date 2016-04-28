'strict mode';

const zipToJson = require('../services/parsers/zipToJson');
const zipCsvToJson = require('../services/parsers/zipCsvToJson');
const Deputes = require('mongoose').model('Elus');
const extractProps = require('../services/extractProps');
const descriptions = require('../config/assembleDatas.js');
const downloadFile = require('../services/downloadFile');
const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');

function populate(next) {
  return Deputes.remove({}).then(() => {
    const descriptionsDeputes = descriptions.deputes;
    const descriptionsMaires = descriptions.maires;
    const descriptionsConseilReg = descriptions.conseillersRegion;
    return zipToJson(descriptionsDeputes).then(datas => {
      var i = 0;
      var mandat = {};
      const promises = datas.export.acteurs.acteur.map( d => {
          var numUrl = d.uid['#text'].match(/[A-Z]*(\d*)/)[1];
          var path = `./datas/deputes/img/${d.uid['#text']}.jpg`;
          var exist = false;
          try {
            fs.lstatSync(path);
          } catch (err) {
            if(err && err.code === 'ENOENT') {
              downloadFile(`http://www2.assemblee-nationale.fr/static/tribun/14/photos/${numUrl}.jpg`, path);
            }
          }
          var depute = extractProps(d, descriptionsDeputes);
          depute.mandat.type = 'parlement'
          return Deputes.create(depute).catch((e => {
            console.log(e);
          }));
        });
      return Promise.all(promises).then(r => {
        return r;
      }).catch(err => {
        // console.log(err.errors);
      });
    }).then((arr) => {
      zipCsvToJson(descriptionsMaires, json => {
        var cumulars = [];
        console.log(json.length, 'Maires');
        return Promise.all(
          _.take(json, 999999).map( m => {
            return Deputes.find({
              nom: new RegExp('^'+m.nompsn+'$', "i"),
              prenom:  new RegExp('^'+m.prepsn+'$', "i")
            }).then(r => {
              if(r.length && _.find(r[0].mandat, {type: 'maire'})){
                console.log(m.prepsn, m.nompsn);
              }
              if(r.length && !_.find(r[0].mandat, {type: 'maire'})) {
                r[0].mandat.push({
                  departement: m.libdpt,
                  commune: m.libsubcom,
                  type: 'maire'
                })
                cumulars = cumulars.concat(r);
                return r[0].save();
              }else{

                var maire = extractProps(m, descriptionsMaires);
                maire.mandat = {
                  departement: m.libdpt,
                  commune: m.libsubcom,
                  type: 'maire'
                };
                return Deputes.create(maire).catch(e => {
                  console.log(e);
                })
              }
            })
          })
        ).then(r => {
          console.log('CUMULARS => ', cumulars.length);
        }).catch(e => {
          console.log(e);
        })
      })
    })
  });
}

module.exports = populate;
