const _ = require('lodash');
const helpers = require('./helpers');

function extractProps (obj, description) {
  const result = {};
  _.forEach(description.props, (d, key) => {
    try{
      if(typeof d[0] === 'function') {
        // console.log('====>', d[0](obj));
        // console.log('===>', d[0](obj), d.slice(1,d.length));
        _.set(result, key, helpers.lookup(d[0](obj), d.slice(1, d.length), ''));
        // console.log(result);
      }else{
        _.set(result, key, helpers.lookup(obj, d, {}));
      }
    } catch(err) {
      console.log(err);
    }
  })
  return result;
}

module.exports = extractProps;
