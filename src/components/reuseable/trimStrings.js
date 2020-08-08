export default String.prototype.trimString = function (length) {
    return this.length > length ? this.substring(0, length) + "..." : this;
  }