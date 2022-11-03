import { openUserConsentWindow } from '../utils';

export async function renderCredentialAcceptance({ id, data: verifiableCredential }, sender) {
  const userConsentWindow = await openUserConsentWindow('/user-consent/vc-accept');
  
  const userConsentTask = {
    data     : {},
    metadata : {
      messageId           : id,
      sender              : sender.tab.id,
      userConsentWindowId : userConsentWindow.id
    }
  };

  chrome.storage.session.set({ [userConsentWindow.id]: userConsentTask });
}