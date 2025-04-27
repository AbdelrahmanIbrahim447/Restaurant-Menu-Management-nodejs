class BaseResource {
    constructor(resource) {
      this.resource = resource;
    }
  
    static collection(resources) {
      return resources.map(resource => new this(resource).toJSON());
    }
  
    toJSON() {
      throw new Error('You must implement toJSON method');
    }
  }
  
  module.exports = BaseResource;