'use strict';

module.exports = function (db) {
  return new Online(db);
};

/**
 * Expose `Online`.
 */
function Online(db) {
  this.db = db;
}

/**
 * Add a user.
 *
 * @param {String} id
 * @param {Function} [fn]
 * @api public
 */
Online.prototype.add = function (id, fn) {
  fn = fn || function () { };
  const key = 'online';

  // Use Redis 4.x style command: sAdd instead of sadd
  this.db.sAdd(key, id).then(() => fn()).catch(fn);
};

/**
 * Get the last `n` online users.
 *
 * @param {Number} n
 * @param {Function} fn
 * @api public
 */
Online.prototype.last = function (n, fn) {
  const key = 'online';

  // Use Redis 4.x style command: sMembers instead of smembers
  this.db.sMembers(key)
    .then((ids) => {
      fn(null, ids.slice(0, n)); // Return the first `n` users
    })
    .catch(fn);
};
