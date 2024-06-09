
module.exports = function(inputCode) {
  const callback = this.async();
  const options = this.getOptions();

  callback(null, inputCode + `\n var d =${JSON.stringify(options)}`);
}
