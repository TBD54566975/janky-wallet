import jwt_decode from 'jwt-decode';

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

export class ParsedCredential {
  constructor(cred) {
    this.payload = cred;
    
    try {
      if (typeof cred === 'string') {
        if (JWT_REGEX.test(cred)) {
          this.designation = 'jwt';
          this.header = jwt_decode(cred, { header: true });
          this.payload = jwt_decode(cred);
        }
      }
      if (this.payload.vc) { 
        this.designation = 'jwt_vc';
      } else if (this.payload.vp) { 
        this.designation = 'jwt_vp';
      } else if (this.payload.proof) {
        const context = cred['@context'];
        if (context && context[0] === 'https://www.w3.org/2018/credentials/v1') {
          const type = Array.isArray(this.payload.type) ? this.payload.type : [this.payload.type];
          
          if (type.includes('VerifiableCredential')) {
            this.designation = 'ldp_vc';
          } else if (type.includes('VerifiablePresentation')) {
            this.designation = 'ldp_vp';
          } else {
            this.designation = 'ldp';
          }
        }
      }
    } catch (e) {
      throw TypeError('Unrecognized credential format');
    }
  }
}