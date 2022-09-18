# Janky Wallet

A browser extension identity wallet
## Introduction
The primary motivation for this project is to provide an entrypoint to the web5 ecosystem for end-users and developers. More specifically, this wallet aims to: 

- Provide end-users with a place to store, manage, and provision permissioned access to their identity which is made up of DIDs, Verifiable Credentials, and personal data.
- Provide developers with a [prollyfilled](https://twitter.com/slexaxton/status/257543702124306432) API injected by the wallet onto the global `window` object at `window.web5` to build web5 apps. The methods provided by this API enable developers to:
  - Initiate passwordless registration / login flows using DIDs 
  - Issue and request verifiable credentials
  - Request access, read, write, and subscribe to independently verifiable user data

- **TODO**: add wallet architecture diagram
- **TODO**: add message-flow diagram
- **TODO**: add link to web5 API design doc
- **TODO**: add links to design doc proposals for each web5 API method

## Project Resources
| Resource                                   | Description                                                       |
| ------------------------------------------ | ----------------------------------------------------------------- |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                      |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide                                                   |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                       | 
