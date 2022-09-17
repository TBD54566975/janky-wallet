export class BackgroundMessageRouter {
  constructor() {
    this.registeredHandlers = {};

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      const { id, cmd, data } = message;
      const handler = this.registeredHandlers[cmd];

      if (!handler) {
        chrome.tabs.sendMessage(sender.tab.id, { id, errors: [{ error: 'CMD_NOT_FOUND' }] });
      }

      const sendResponse = (response) => {
        chrome.tabs.sendMessage(sender.tab.id, { id, data: response });
      };

      try {
        await handler(data, sender, sendResponse);
      } catch(e) {
        // TODO: improve error handling. potentially allow for multiple errors to be surfaced
        chrome.tabs.sendMessage(sender.tab.id, {id, errors: [{ error: e.message }]});
      }
    });
  }

  on(cmd, handler) {
    if (this.registeredHandlers[cmd]) {
      throw new Error(`a handler has already been registered for [${cmd}]`);
    }

    this.registeredHandlers[cmd] = handler;
  }
}