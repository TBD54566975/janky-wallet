# `web5.did.request` <!-- omit in toc -->

* Author(s): Daniel Buchner, Moe Jangda
* Last Updated: 2022/11/12

# Table of Contents <!-- omit in toc -->
- [Overview](#overview)
- [Example Use Case(s)](#example-use-cases)
  - [Credential Issuance](#credential-issuance)
- [User Consent](#user-consent)
- [Implementation Details](#implementation-details)
  - [Method Signature](#method-signature)
  - [Types](#types)
    - [`DIDRequestOptions`](#didrequestoptions)
    - [`Web5Response`](#web5response)
    - [`DIDPresentation`](#didpresentation)
  - [Proof Construction](#proof-construction)
    - [Header](#header)
    - [Payload](#payload)
  - [Notable Cases](#notable-cases)
  - [Open Questions](#open-questions)
- [Security Considerations](#security-considerations)

# Overview
This method can be used by clients to request a DID from a wallet owner. The wallet mediates access to clients in order to preserve user privacy. The wallet is responsible for ensuring that this operation is not performed without user consent.

# Example Use Case(s)
## Credential Issuance
Issuing a Verifiable Credential to an individual requires the individual to provide the issuer with a DID to issue the credential to (e.g. [`credentialSubject.id`](https://www.w3.org/TR/vc-data-model/#credential-subject))

# User Consent
The wallet is responsible for ensuring that this operation is not performed without user (aka wallet owner) consent. This means that the wallet must prompt the user and the user must explicitly agree to sharing a DID of their choice with the client

![User Consent](assets/images/web5-did-request-user-consent.png)

The wallet should provide a means to prevent the client (AKA host/domain) from requesting DIDs.

# Implementation Details

## Method Signature
```typescript
function web5.did.request(didRequestOptions: DIDRequestOptions): Promise<Web5Response<DIDPresentation>>
```

## Types
### `DIDRequestOptions`
```typescript
type DIDRequestOptions = {
  /** A randomly generated challenge to prove DID control. In order to prevent replay attacks, the challenges MUST contain enough entropy to make guessing them infeasible and should therefore be at least 16 bytes long. */
  challenge: String
  /** a list of accepted DID methods */
  methods?: String[]
  /** client's reason for requesting a DID. Will be displayed to wallet controller */
  reason?: String
}
```

### `Web5Response`
```typescript
type Web5Response<Type> = {
  error?: string,
  data: Type
};
```

### `DIDPresentation`
```typescript
type DIDPresentation = {
  /** the wallet owner's selected DID */
  did: String
  /** proof of control for selected DID */
  proof: String
}
```

## Proof Construction
The proof **MUST** be a compact [JWS](https://www.rfc-editor.org/rfc/rfc7515) that contains the following

### Header
The Protected Header **MUST** contain at least the following properties:
| Property | Type   | Description                                                                                                                                     |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `alg`    | String | Text                                                                                                                                            |
| `kid`    | String | Key ID. used to identify which public key should be used to verify the signature. This Key ID **MUST** be present as a [verification method](https://www.w3.org/TR/did-core/#referring-to-verification-methods) in the provided did's DID Doc |
|          |        |                                                                                                                                                 |
### Payload
The JWS payload **MUST** be a JSON object that contains the following properties:

| Property    | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `challenge` | String | Challenge provided by the requester |
| `origin`    | String | The requester's origin              |
| `type`      | Const  | `web5.did.get`. The purpose of this member is to prevent certain types of signature confusion attacks (where an attacker substitutes one legitimate signature for another)                      |


## Notable Cases
**Wallet doesn't support the DID methods provided by the client in `DIDRequestOptions`**

return `METHODS_UNSUPPORTED` error without prompting the user because there's nothing they can do here to alter the outcome.

Note: _returning an explicit error makes it unintentionally possible for support (or lack thereof) to be "crawlable"_

---

**User declines to share a DID**

return `REQUEST_DENIED` error

---

**[⚠ Unresolved] Wallet supports DID method provided by client but user hasn't created a DID of that method**

The 2 options that come to mind here are:
* Render UI that requests the user to create a new DID to share. 
  * User will likely be confused as to why they have to create a new DID. We may want to consider some sensible text to display
* automatically return some error without prompting the user

---

## Open Questions
**❓ What should the behavior of `web5.did.request` be when a client calls `web5.did.request` again **after** having already received a DID from the user?**

Options that come to mind are:
* initiate same flow as before. Wallet should render UI to indicate which DID has already been shared to the requesting origin.
  * Wallet would then likely need to provide functionality/UI to "disconnect" a DID from an origin
* returns an array of DIDs shared with the requesting origin **without** prompting the user
  * _Note: Example scenario in question below is relevant to this_
* include a `requireProof` boolean property to [`DIDRequestOptions`](#didrequestoptions) which allows client to choose between above two options. 
  * `requireProof: true` triggers option 1. 
  * `requireProof: false` returns array of shared DIDs if any have been shared. If none have been shared, triggers option 1

---

**❓ Should [`DIDRequestOptions`](#didrequestoptions) contain a property that allows clients to exclude specific DIDs?**


_Example scenario: User has already shared a DID with the client, and now wants to share another one_

---

**❓ Should [`DIDRequestOptions`](#didrequestoptions) contain a property that allows clients to specify specific DIDs?**

⚠ This question is contingent upon the first open question 

---

**❓ Should [`DIDRequestOptions`](#didrequestoptions) contain a property that allows clients to specify which [`verificationMethod`](https://www.w3.org/TR/did-core/#verification-methods) types they support?**

Hopefully not? don't know enough about how often only one is supported

---

**❓ Should [`DIDRequestOptions`](#didrequestoptions) contain a property that allows clients to specify which cryptographic algorithms they support?**

---

**❓ Should [user consent](#user-consent) show the challenge sent by the client?**

---

**❓ is there too much overlap with [`DIDAuthn`](web5-did-authn.md)?**

---

# Security Considerations
⚠ Sites lying about their intent with `reason`.