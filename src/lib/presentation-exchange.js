
import jwt_decode from 'jwt-decode';
import { JSONPath } from '@astronautlabs/jsonpath';
const ajv = require('ajv');
const schemaValidator = new ajv();
const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

export class ParsedCredential {
  constructor(cred) {
    this.payload = cred;
    try {
      if (typeof cred === 'string') {
        if (jwtRegex.test(cred)) {
          this.designation = 'jwt';
          this.header = jwt_decode(cred, { header: true });
          this.payload = jwt_decode(cred);
        }
      }
      if (this.payload.vc) this.designation = 'jwt_vc';
      else if (this.payload.vp) this.designation = 'jwt_vp';
      else if (this.payload.proof) {
        const context = cred['@context'];
        if (
          context &&
          context[0] === 'https://www.w3.org/2018/credentials/v1'
        ) {
          const type = Array.isArray(this.payload.type)
            ? this.payload.type
            : [this.payload.type];
          if (type.includes('VerifiableCredential')) {
            this.designation = 'ldp_vc';
          } else if (type.includes('VerifiablePresentation')) {
            this.designation = 'ldp_vp';
          } else this.designation = 'ldp';
        }
      }
    } catch (e) {
      throw TypeError('Unrecognized credential format');
    }
  }
}

export function processCredentials(creds, definition) {
  let results = sortCredentials(definition, creds);
  const requirements = definition.submission_requirements;
  if (requirements) {
    let filtered = evalRequirements(results.byGroup, requirements);
    if (filtered.length) {
      results.requirements = filtered;
    }
    results.canSubmit = !!results.requirements;
  }
  else {
    results.canSubmit = !Object.values(results.byId).some(entry => !entry.submittable);
  }
  return results;
}

function sortCredentials(definition, creds) {
  const { format, input_descriptors: descriptors } = definition;
  const results = {
    byId: {}
  };
  const parsedCreds = new Map();
  descriptors.forEach(descriptor => {
    const { id, group, constraints } = descriptor;
    const idEntry = results.byId[id] = {
      descriptor: descriptor,
      submittable: false,
      credentials: []
    };
    const selfAssertable = constraints.subject_is_issuer === 'required' || 
                           constraints.subject_is_issuer === 'preferred';
    if (definition.submission_requirements && !group) {
      throw new SyntaxError('All descriptors must be grouped if Submission Requirements are present');
    }
    if (selfAssertable) {
      idEntry.submittable = true;
      idEntry.selfAssertable = true;
    }
    if (group) {
      var groups = results.byGroup = (results.byGroup || {});
      group.forEach(z => {
        let groupEntry = groups[z] = (groups[z] || {
          choices: 0,
          size: 0
        });
        groupEntry.size++;
        if (selfAssertable){
          groupEntry.choices++;
          groupEntry.selfAssertable = groupEntry.selfAssertable || {};
          groupEntry.selfAssertable[descriptor.id] = descriptor;
        }
      });
    }
    creds.forEach(c => {
      let credential;
      let match = false;
      try {
        const { fields } = constraints;
        parsedCreds.set(c, credential = new ParsedCredential(c));
        if (
            (format && formatFilter(credential, format)) && 
            (fields && fieldFilter(credential, fields))
          ) {
            match = true;
            idEntry.submittable = true;
            idEntry.credentials.push(credential);
          }  
      }
      catch (e) {
        match = false;
      }
      if (match && group) {
        group.forEach(z => {
          let creds = groups[z].credentials = (groups[z].credentials || {});
          creds[id] = credential;
          groups[z].choices++;
        });
      }
    });
  });
  console.log(results);
  return results;
}

function evalRequirements(groupedResults, requirements, count) {
  count = count || requirements.length;
  let filtered = requirements.filter(req => {
    if (req.from) {
      let group = groupedResults[req.from];
      if (req.rule === 'pick' && req.count > group.size) {
        throw new TypeError('Invalid submission_requirement');
      }
      else if (group.choices >= req.count){
        return true;
      }
    }
    else {
      req.from_nested = evalRequirements(groupedResults, req.from_nested, req.count);
      return req.from_nested.length;
    }
  });
  return filtered;
}

function fieldFilter(credential, fields) {
  return fields.every(field => {
    return field.path.some(path => {
      try {
        let values = JSONPath.query(credential.payload, path);
        if (!values.length && field.optional !== true) {
          return false;
        }
        return field.filter
          ? schemaValidator.validate(field.filter, values[0])
          : true;
      } catch (e) {
        return false;
      }
    });
  });
}

function formatFilter(credential, formats) {
  try {
    const format = formats[credential.designation];
    if (!format) return false;
    if (credential.designation.match(/^jwt/)) {
      return format.alg.includes(credential.header.alg);
    } else if (credential.designation.match(/^ldp/)) {
      return format.proof_type.includes(credential.payload.proof.type);
    }
    return false;
  } catch (e) {
    return false;
  }
}