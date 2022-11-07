import { openUserConsentWindow } from '../utils';
import { processCredentials } from '../../lib/presentation-exchange';

export async function renderCredentialApplication({ id, data: credentialManifest }, sender, _) {
  // TODO: fetch cred manifest if message contains URL
  // TODO: parse/validate CredentialManifest
  
  const result = processCredentials([], credentialManifest);

  // TODO: query store for all creds

  if (!result.canSubmit) {
    throw new Error('could not satisfy submission requirements declared in manifest');
  }

  const userConsentWindow = await openUserConsentWindow('/user-consent/vc-application');

  const userConsentTask = {
    data     : result,
    metadata : {
      messageId           : id,
      sender              : sender.tab.id,
      userConsentWindowId : userConsentWindow.id
    }
  };

  chrome.storage.session.set({ [userConsentWindow.id]: userConsentTask });
}