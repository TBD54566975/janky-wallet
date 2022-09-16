import EventEmitter from 'eventemitter3';

export class Messenger {
  constructor() {
    this.emitter = new EventEmitter();
    chrome.runtime.onMessage.addListener((message, sender) => {
      this.emitter.emit(message.id, { message, sender });
    });
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (!message.id) {
        message.id = Date.now();
      }

      this.emitter.once(message.id, resolve);
      chrome.runtime.sendMessage(message);
    });
  }
}