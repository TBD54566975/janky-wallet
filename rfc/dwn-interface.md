⚠ _TODO: Make sure to consider how this works on mobile as well_

`web5.dwn.collections.query`
* Unauthenticated
  * Unauthenticated method calls return `published: true` data only
* No explicit user consent required
* Can be used to query for ANY DID's data. 
* DID must be explicitly provided as an argument

`web5.dwn.collections.write()`
* Unauthenticated
  * Refer to DWN spec to figure out what can be written without permission
  * 


`web5.dwn.protocols.query`
* Unauthenticated
  * Unauthenticated method calls return `published: true` data only
* No explicit user consent required
* Can be used to query for ANY DID's data. 
* DID must be explicitly provided as an argument

`web5.getChallenge`
* Unauthenticated
* returns challenge with a ttl


`web5.dwn.permissions.request`
* **Explicit** user consent required
* _Note: App manifest support could be really cool for declaring required permissions_
* Should take an array of `PermissionRequest` messages so that the user isn't bothered by 8000 popups
* Wallet stores host <-> grant associations so that caller doesn't have to explicitly provide permission 
* ⚠ **Discuss with Henry**: Grantor should be able to invoke granted permissions**
* Implicit challenge via `.well-known`
* Method argument:
```javascript
{
  permissions: [Wrapper<PermissionsRequest, required: Boolean>]
}
```
* _Note_: How do we provide grant responses that are associated to the original request
* 
