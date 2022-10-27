import { openUserConsentWindow } from '../../lib/background-utils';

export async function renderCredentialApplication(data, sender, sendResponse) {
  console.log('renderCredentialApplication', data);
  const userConsentWindow = await openUserConsentWindow('/user-consent/vc-application');

  // TODO: fetch cred manifest if message contains URL
  // TODO: parse/validate CredentialManifest
  // TODO: query store for all creds
  // TODO: run pe.processCredentials
  // TODO: pack everything up and store it in local storage so that popup can pick it up
  // TODO: trigger pop-up window
}