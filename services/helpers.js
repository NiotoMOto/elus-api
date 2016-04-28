const _ = require('lodash');

const lookup = function(xs, ks, notFound) {
  var found;
  if (_.isArray(ks)) {
    if (ks.length === 1 || _.isUndefined(_.get(xs, ks[0]))) {
      found = _.get(xs, ks[0]);
    } else {
      found = lookup(_.get(xs, ks[0]), ks.slice(1));
    }
  } else {
    found =  _.get(xs, ks);
  }
  return _.isUndefined(found) ? notFound : found;
};


module.exports.lookup = lookup;
