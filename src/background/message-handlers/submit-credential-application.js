export async function submitCredentialAppliction({ data: applicationDetails }, sender, _) {
  const tasks = await chrome.storage.session.get();
  const task = tasks[sender.tab.windowId];

  console.log(task);

  await chrome.notifications.create({
    type    : 'basic',
    title   : 'Received a Verifiable Credential!',
    message : 'Digital Identity Card',
    iconUrl : '/tbd-fav-icon-main.png'
  });

  // TODO: send response back to webapp
  await chrome.tabs.sendMessage(task.metadata.sender, { id: task.metadata.messageId });
}