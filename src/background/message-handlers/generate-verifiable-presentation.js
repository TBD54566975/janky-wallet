export async function generateVerifiablePresentation({ data: selectedCredentials }, sender, _) {
  const tasks = await chrome.storage.session.get();
  const task = tasks[sender.tab.windowId];

  console.log(task);

  // TODO: send response back to webapp
  await chrome.tabs.sendMessage(task.metadata.sender, { id: task.metadata.messageId });
}