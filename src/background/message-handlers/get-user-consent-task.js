export async function getUserConsentTask(_, sender, sendResponse) {
  const tasks = await chrome.storage.session.get();
  const registrationInfo = tasks[sender.tab.windowId];

  console.log('[background]', registrationInfo);
  sendResponse(registrationInfo.data);
}