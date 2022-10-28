import { openUserConsentWindow } from '../../lib/background-utils';
import { processCredentials } from '../../lib/presentation-exchange';

export async function renderCredentialApplication(credentialManifest, sender, _) 
{
  console.log('renderCredentialApplication', credentialManifest);
  const result = processCredentials([], credentialManifest);

  if (!result.canSubmit) {
    throw new Error('could not satisfy submission requirements declared in manifest');
  }

  const userConsentWindow = await openUserConsentWindow('/user-consent/vc-application');
  
  // TODO: fetch cred manifest if message contains URL
  // TODO: parse/validate CredentialManifest
  // TODO: query store for all creds
  // TODO: run pe.processCredentials

  const userConsentTask = {
    data: {
      credentialManifest,
      processedCredentials: result
    },
    metadata: {
      sender: sender.tab.id,
      userConsentWindowId: userConsentWindow.id
    }
  };

  chrome.storage.session.set({ [userConsentWindow.id]: userConsentTask });
}