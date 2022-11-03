import { openUserConsentWindow } from '../utils';
import { processCredentials } from '../../lib/presentation-exchange';

export async function renderCredentialRequest({ id, data: presentationExchange }, sender, sendResponse) {
  const userConsentWindow = await openUserConsentWindow('/user-consent/vc-selection');
  
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