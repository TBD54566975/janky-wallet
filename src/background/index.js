import * as db from '../db';
import * as DWN from './dwn';

import { MessageRouter } from './message-router';
import { getUserConsentTask } from './message-handlers/get-user-consent-task';
import { startDidRegistration } from './message-handlers/did-authn/start-did-registration';
import { renderCredentialApplication } from './message-handlers/render-credential-application';
import { submitCredentialAppliction } from './message-handlers/submit-credential-application';
import { renderCredentialRequest } from './message-handlers/render-credential-request';
import { generateVerifiablePresentation } from './message-handlers/generate-verifiable-presentation';
import { renderCredentialAcceptance } from './message-handlers/render-credential-acceptance';
import { getPersonas } from './message-handlers/get-personas';

chrome.runtime.onInstalled.addListener(async ({ _reason, _version }) => {
  const { Persona } = await db.create();

  const [defaultPersona] = await Persona.query({ name: 'default' }, { limit: 1 });

  if (!defaultPersona) {
    await Persona.create('default');
  }

  await DWN.load();
});

// controls what happens when the extension's icon is clicked
chrome.action.onClicked.addListener(async _ => {
  // load the extension dashboard in a new tab in the current window
  await chrome.tabs.create({ active: true, url: '/dashboard' });
});

chrome.notifications.onClicked.addListener(async () => {
  // load the extension dashboard in a new tab in the current window
  await chrome.tabs.create({ active: true, url: '/dashboard/credentials' });
});

const messageRouter = new MessageRouter();

messageRouter.on('DID_AUTHN_REGISTER', startDidRegistration);
messageRouter.on('GET_PERSONAS', getPersonas);

messageRouter.on('VC_APPLY', renderCredentialApplication);
messageRouter.on('VC_SUBMIT_APPLICATION', submitCredentialAppliction);

messageRouter.on('VC_REQUEST', renderCredentialRequest);
messageRouter.on('VC_GENERATE_VP', generateVerifiablePresentation);

messageRouter.on('VC_ISSUE', renderCredentialAcceptance);

messageRouter.on('GET_USER_CONSENT_TASK', getUserConsentTask);