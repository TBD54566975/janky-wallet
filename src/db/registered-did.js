export class RegisteredDID {
  constructor(client) {
    this.client = client;
  }

  async query(query = {}, options = {}) {
    const findArg = { selector: query, ...options };

    return this.client.find(findArg).exec();
  }
}