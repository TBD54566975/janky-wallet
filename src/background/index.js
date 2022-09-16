import * as db from '../db';

chrome.runtime.onInstalled.addListener(async ({ reason, version }) => {
  const { Persona } = await db.create();

  const [defaultPersona] = await Persona.query({ name: 'default' }, { limit: 1 });

  if (!defaultPersona) {
    await Persona.create('default');
  }
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('[background]', sender, message);

  const response = { id: message.id };

  if (message.op === 'DID_AUTHN_REGISTER') {
    const cw = await chrome.windows.getLastFocused();

    const userConsentPopup = await chrome.windows.create({
      width: 459,
      height: 692,
      top: 100,
      left: cw.width - 500,
      type: 'popup',
      url: '/did-registration'
    });

    const userConsentTask = {
      message,
      metadata: {
        sender: sender.tab.id,
        userConsentWindowId: userConsentPopup.id
      }
    };

    chrome.storage.session.set({ [userConsentPopup.id]: userConsentTask });

  } else if (message.op === 'GET_PERSONAS') {
    const { Persona } = await db.create();
    const personas = await Persona.query();
    const result = [];

    for (let p of personas) {
      result.push(p.toJSON());
    }

    chrome.tabs.sendMessage(sender.tab.id, { id: message.id, data: result });

  } else if (message.op === 'GET_REGISTRATION_INFO') {
    const tasks = await chrome.storage.session.get();
    const registrationInfo = tasks[sender.tab.windowId];

    console.log('[background]', registrationInfo);
    chrome.tabs.sendMessage(sender.tab.id, { id: message.id, data: registrationInfo.message });
  } else {
    response.errors = [{ error: 'OP_NOT_FOUND' }];
  }


  return true;
});