const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schema = new Schema({
    nom: {type: String},
    prenom: {type: String},
    externalId: {type: Number},
    catSocialePro: {type: String},
    civ: {type: String},
    profession: {type: String},
    dateNais: {type: Date},
    circoniption: {type: String},
    externalId: {type: String},
    mandat: [{
      region: {type: String},
      departement: {type: String},
      commune: {type: String},
      numCirco: {type: Number},
      type: {type: String}
    }]
});

module.exports = mongoose.model('Elus', schema);
