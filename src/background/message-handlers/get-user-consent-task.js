export async function getUserConsentTask(_, sender, sendResponse) {
  const tasks = await chrome.storage.session.get();
  const task = tasks[sender.tab.windowId];

  console.log('[background]', task);
  sendResponse(task.data);
}