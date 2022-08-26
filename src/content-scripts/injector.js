document.addEventListener('1660022065712_monkeys', function (e) {
  console.log('[injector] <- web', e);

  chrome.runtime.sendMessage("Test123", resp => {
    console.log('[injector] <- background', resp);
  });
});

/**
 * injectScript - Inject internal script to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag = 'body') {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

injectScript(chrome.runtime.getURL('src/provider.js'));