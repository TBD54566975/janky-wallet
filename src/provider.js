console.log('herro');

document.addEventListener('mimiseeku', function (evt) {
  console.log('[web] <- injector', evt);
});

window.identityProvider = {
  send: function (msg) {
    const evt = new CustomEvent('1660022065712_monkeys', msg);
    document.dispatchEvent(evt);
  }
};
