# Janky Wallet

A browser extension identity wallet

## Dependencies
- [Vite](https://vitejs.dev/) - Bundling Tool
- [CRXJS](https://crxjs.dev/vite-plugin/getting-started/vue/create-project) - Vite Plugin for chrome extension support.
- [VueJS](https://vuejs.org/) - Frontend framework
- [Vue-Router](https://router.vuejs.org/) - Client-side Routing
- [RxDB](https://rxdb.info/) - Client side DB. Wraps [Dexie](https://dexie.org/) which wraps [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework to help with the JANK

## Recommended Developer Environment Setup
- Editor: [VS Code](https://code.visualstudio.com/) 
- VS Code Extensions:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 
    - Vue Language features
  - [Tailwind Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - auto-completes class-names and shows you the underlying CSS
  - [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
    - Auto-completes filenames
  - [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)
    - Makes it really easy to spot out open/close brackets
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    - Easily view commits directly within the file you're editing

### Auto-format on save
This project uses [ESLint](https://eslint.org/) for linting and formatting code. If you want to automatically format the file you're working on everytime you save, follow the instructions below:
- open `settings.json`. [Reference](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson)
- add these settings:
```
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```

## Running Locally
### Requirements
- nodeJS
  - `brew install node` should do the trick. Note, if you've gone through Block's eng setup, they jerry-rig dependency installation by pointing to Block's internal artifactory repo as the default dependency registry which means you probably will have to connect to the VPN to run `npm install`. If you're annoyed enough with that and want to change it, DM me and i'll show you how

### Setup
```bash
git clone https://github.com/TBD54566975/janky-wallet
cd janky-wallet
npm install
npm run dev
```
- pop open a chrome window
- navigate to `chrome://extensions`
- toggle _Developer Mode_ on (toggle should be on top right)
- click on _Load Unpacked_
- navigate to the cloned directory
- select the `dist` directory. The extension should now appear in the tiled list of installed extensions
- click the puzzle icon to the right of the omnibar
- click the pushpin icon next to Janky Wallet

![setup gif](gifs/janky-wallet-setup.gif)
## Helpful Resources
* [Chrome Extension Developer Docs](https://developer.chrome.com/docs/extensions/reference/)
