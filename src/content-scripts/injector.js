import { Messenger } from '../lib/messenger';
const messenger = new Messenger();

document.addEventListener('1660022065712_monkeys', async function (e) {
  console.log('content script', e);
  const { detail: message } = e;
  const { cmd } = message;

  let response = { id: message.id };

  if (cmd === 'DID_AUTHN_REGISTER') {
    message.rp = { id: e.target.origin };
    const resp = await messenger.sendMessage(message);
    console.log('respownz', resp);

    response = resp;

  } else {
    response.errors = [{ error: 'OP_NOT_FOUND' }];
  }

  const event = new CustomEvent(e.detail.id, { detail: response });
  document.dispatchEvent(event);
});

/**
 * injectScript - Inject internal script to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 * @see    {@link https://stackoverflow.com/questions/9602022/chrome-extension-retrieving-global-variable-from-webpage}
 */
function injectScript(file_path, tag = 'body') {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

injectScript(chrome.runtime.getURL('src/content-scripts/web5.js'));