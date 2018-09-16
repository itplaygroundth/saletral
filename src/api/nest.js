const _ = require('lodash');

const nest = function (seq, keys, subkeys) {
  if (!keys.length) { return seq }
  
  let first = keys[0];
   
  let rest = keys.slice(1);
   
  return _.mapValues(_.groupBy(seq, keys), function (value) { 
    console.log(value);
    return nest(value, subkeys);
  });
};
const grouping = function (characters, name) {

  return _.mapValues(_.groupBy(characters, name), clist => clist.map(car => _.omit(car, name)));
};
  // return _.chain(characters).groupBy(name).map(function (v, i) {
  //   // console.log(_.get(_.find(v, name), name));
  //   return {
  //     category: _.get(_.find(v, name), name),
  //     data: _.map(v, subgroup)
  //   };
  // }).value();

// };

module.exports = { nest, grouping };