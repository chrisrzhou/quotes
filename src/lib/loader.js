const parser = require('./parser');
const stringifyObject = require('stringify-object');

module.exports = async function(content) {
  const callback = this.async();
  const quotes = stringifyObject(parser(content));
  const code = `export default ${quotes};`;
  return callback(null, code);
};
