import * as db from '../db';
import { MessageRouter } from './message-router';
import { getUserConsentTask } from './message-handlers/get-user-consent-task';
import { startDidRegistration } from './message-handlers/did-authn/start-did-registration';
import { renderCredentialApplication } from './message-handlers/render-credential-application';
import { getPersonas } from './message-handlers/get-personas';

chrome.runtime.onInstalled.addListener(async ({ _reason, _version }) => {
  const { Persona } = await db.create();

  const [defaultPersona] = await Persona.query({ name: 'default' }, { limit: 1 });

  if (!defaultPersona) {
    await Persona.create('default');
  }
});

// controls what happens when the extension's icon is clicked
chrome.action.onClicked.addListener(async _ => {
  // load the extension dashboard in a new tab in the current window
  await chrome.tabs.create({ active: true, url: '/dashboard' });
});

const messageRouter = new MessageRouter();

messageRouter.on('DID_AUTHN_REGISTER', startDidRegistration);
messageRouter.on('GET_PERSONAS', getPersonas);

messageRouter.on('VC_APPLY', renderCredentialApplication);
messageRouter.on('GET_USER_CONSENT_TASK', getUserConsentTask);