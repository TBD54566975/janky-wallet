import * as db from './db';

chrome.runtime.onInstalled.addListener(async ({ reason, version }) => {
  const { Persona } = await db.create();

  const [defaultPersona] = await Persona.query({ name: 'default' }, { limit: 1 });

  if (!defaultPersona) {
    await Persona.create('default');
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('[background] <- injector', sender, message);
  const cw = await chrome.windows.getLastFocused();

  const veendo = await chrome.windows.create({
    width: 459,
    height: 692,
    top: 100,
    left: cw.width - 500,
    type: 'popup'
  });

  console.log(veendo);
  sendResponse("timmy")
});