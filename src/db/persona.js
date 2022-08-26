import { DIDKey } from '../lib/did-key';

export class Persona {
  constructor(client) {
    this.client = client;
  }

  async create(name) {
    const { did, privateJWK, publicJWK } = await DIDKey.generate();

    await this.client.insert({ name, did, privateJWK, publicJWK });
  }

  async query(query = {}, options = {}) {
    const findArg = { selector: query, ...options };

    return this.client.find(findArg).exec();
  }
}