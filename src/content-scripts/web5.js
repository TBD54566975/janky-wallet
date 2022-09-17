console.log('OY!');

window.web5 = {
  did: {
    authn: {
      register: async function (registrationOpts = {}) {
        await window.web5.send('DID_AUTHN_REGISTER', registrationOpts);
      }
    }
  },
  send: function (cmd, data) {
    return new Promise((resolve, _) => {
      const evt = new CustomEvent('1660022065712_monkeys', {
        detail: { cmd, data, id: Date.now() }
      });

      document.addEventListener(evt.detail.id, e => {
        console.log('peanuts');
        resolve(e.detail);
      });

      document.dispatchEvent(evt);
    });
  }
};
