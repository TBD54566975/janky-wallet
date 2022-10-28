import { openUserConsentWindow  } from '../../utils';

export async function startDidRegistration(data, sender, _) {
  const userConsentWindow = await openUserConsentWindow('/user-consent/did-registration');
  
  const userConsentTask = {
    data,
    metadata: {
      sender: sender.tab.id,
      userConsentWindowId: userConsentWindow.id
    }
  };

  chrome.storage.session.set({ [userConsentWindow.id]: userConsentTask });
}