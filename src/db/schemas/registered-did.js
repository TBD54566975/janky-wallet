export const RegisteredDIDSchema = {
  title      : 'registered did schema',
  version    : 0,
  primaryKey : 'did',
  type       : 'object',
  properties : {
    relyingParty: {
      type      : 'string',
      maxLength : 100
    },
    did: {
      type      : 'string',
      maxLength : 60
    },
  },
  required: ['did', 'relyingParty']
};