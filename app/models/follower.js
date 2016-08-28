// Example model


function Follower (opts) {
  if(!opts) opts = {};
  this.avatarUrl = opts.avatarUrl || '';
  this.userName = opts.userName || '';
  this.url = opts.url || '';
}

module.exports = Follower;
