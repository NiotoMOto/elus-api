

const _ = require('lodash');

function getMandat(el) {
  var result = {};
  _.forEach(el.mandats.mandat, m => {
    if(m.election){
      result = m;
    }
  })
  return result ;
}


module.exports = {
  'deputes': {
    'name': 'deputes',
    'url': 'http://data.assemblee-nationale.fr/static/openData/repository/AMO/deputes_actifs_mandats_actifs_organes/AMO10_deputes_actifs_mandats_actifs_organes_XIV.json.zip',
    'props': {
      'nom': ['etatCivil', 'ident', 'nom'],
      'prenom': ['etatCivil', 'ident', 'prenom'],
      'catSocialePro': ['profession', 'socProcINSEE', 'catSocPro'],
      'civ': ['etatCivil', 'ident', 'civ'],
      'profession': ['profession', 'libelleCourant'],
      'externalId': ['uid', '#text'],
      'dateNais': ['etatCivil', 'infoNaissance', 'dateNais'],
      'mandat.region': [getMandat, 'election', 'lieu', 'region'],
      'mandat.departement': [getMandat, 'election', 'lieu', 'departement'],
      'mandat.numCirco': [getMandat, 'election', 'lieu', 'numCirco']
    }
  },
  'deputesImages': {
    'name': 'deputesImage',
    'url': ''
  },
  'maires': {
    'name': 'maires',
    'url': 'http://www.ideeslibres.org/opendata/communales/2014/maires/maires-17-06-2014.zip',
    'props': {
      'nom': ['nompsn'],
      'prenom:' : ['prepsn'],
      'catSocialePro': ['libcsp'],
      'civ': ['civpsn'],
      'dateNais': ['naissance'],
    }
  },
  conseillersRegion: {
    name: 'conseillersReg',
    url: 'http://data.iledefrance.fr/explore/dataset/liste_des_conseillers_regionaux/download?format=json',
  }
}
