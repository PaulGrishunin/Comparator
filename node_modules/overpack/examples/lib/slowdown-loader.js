module.exports = function(source) {
  const callback = this.async();
  const duration = Math.floor(Math.random() * 5000) + 1000;
  setTimeout(() => callback(null, source), duration);
};
