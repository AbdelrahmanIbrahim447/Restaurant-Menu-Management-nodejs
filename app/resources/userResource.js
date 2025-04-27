const BaseResource = require('./baseResource');

class userResource extends BaseResource {
  toJSON() {
    return {
      id: this.resource.id,
      username: this.resource.username,
      email: this.resource.email,
      created_at: this.resource.created_at
    };
  }
}

module.exports = userResource;