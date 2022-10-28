/**
 * 
 * @param {string} path - indicates what to render in the window. check router/index.js for options
 * @returns {chrome.windows.Window} metadata about the created window
 */
 export async function openUserConsentWindow(path) {
  const currentWindow = await chrome.windows.getLastFocused();
  
  return await chrome.windows.create({
    width: 459,
    height: 692,
    top: 100,
    left: currentWindow.width - 500,
    type: 'popup',
    url: path
  });
}