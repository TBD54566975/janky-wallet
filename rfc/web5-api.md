# Web5 API <!-- omit in toc -->

Author(s): Daniel Buchner, Moe Jangda

# Table of Contents <!-- omit in toc -->
- [Summary](#summary)
- [Motivation](#motivation)
- [API Reference](#api-reference)
  - [DID](#did)
    - [`web5.did.authn`](#web5didauthn)
      - [Description](#description)
      - [Relevant Material](#relevant-material)
    - [`web5.did.supportedMethods`](#web5didsupportedmethods)
      - [Description](#description-1)
      - [Relevant Material](#relevant-material-1)
    - [`web5.did.request`](#web5didrequest)
      - [Description](#description-2)
      - [Relevant Material](#relevant-material-2)
  - [VC](#vc)
    - [`web5.vc.apply`](#web5vcapply)
      - [Description](#description-3)
      - [Relevant Material](#relevant-material-3)
    - [`web5.vc.deliver`](#web5vcdeliver)
      - [Description](#description-4)
      - [Relevant Material](#relevant-material-4)
    - [`web5.vc.request`](#web5vcrequest)
      - [Description](#description-5)
      - [Relevant Material](#relevant-material-5)
  - [DWN](#dwn)

# Summary
API injected by a wallet onto the global [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object at `window.web5`. Used to build web5 apps. The methods provided by this API should enable developers to:
- Initiate passwordless registration / login flows using DIDs
- Issue Verifiable Credentials to users
- Request verifiable Credentials from users
- Request access, read, write, and subscribe to independently verifiable user data

The methods provided by this API can be bucketed into 3 categories:
* `did` - All DID-related methods fall under this category and are namespaced under `web5.did`
* `vc` - All methods related to Verifiable Credentials fall under this category and are namespaced under `web5.vc`
* `dwn` - All methods related to requesting access, reading, writing, and subscribing to independently verifiable user data fall under this category and are namespaced under `web5.dwn`

# Motivation
Our overall goal is for there to be many wallets developed by anyone who chooses to do so. In fact, we'll have failed if there's only one wallet in town. Defining a wallet agnostic `web5` API that can be implemented by any wallet will enable consistency and interoperability across clients and applications. Its functionality can easily be extended by defining new methods.

# API Reference

| Category | Method                      | Description                                                                                                                           | RFC                                    | Spec |
| -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---- |
| DID      | `web5.did.authn`            | Initiates DID-based passwordless registration / login flows                                                                           | [Doc](./web5-did-authn.md)             |      |
| DID      | `web5.did.request`          | Requests a DID from the wallet                                                                                                        | [Doc](./web5-did-request.md)           |      |
| DID      | `web5.did.supportedMethods` | Returns a list of DID methods supported by the wallet                                                                                 | [Doc](./web5-did-supported-methods.md) |      |
| VC       | `web5.vc.apply`             | Initiates a credential application flow in the wallet using a [Credential Manifest](https://identity.foundation/credential-manifest/) | [Doc](./web5-vc-apply.md)              |      |
| VC       | `web5.vc.deliver`           | Delivers Verifiable Credentials to a wallet                                                                                           | [Doc](./web5-vc-deliver.md)            |      |
| VC       | `web5.vc.request`           | Requests Verifiable Credentials from the wallet using [Presentation Exchange](https://identity.foundation/presentation-exchange/)     | [RFC](./web5-vc-request.md)            |      | 
| DWN      |                             |                                                                                                                                       |                                        |      |