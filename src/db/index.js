import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { Persona } from './persona';
import { PersonaSchema } from './schemas/persona';

import { RegisteredDID } from './registered-did';
import { RegisteredDIDSchema } from './schemas/registered-did';

// if (import.meta.env.DEV) {
//   addRxPlugin(RxDBDevModePlugin);
// }

export async function create() {
  const db = await createRxDatabase({
    name            : 'tbjank',
    storage         : getRxStorageDexie(),
    ignoreDuplicate : true
  });

  await db.addCollections({
    personas       : { schema: PersonaSchema },
    registeredDIDs : { schema: RegisteredDIDSchema }
  });

  return {
    Persona       : new Persona(db.collections.personas),
    RegisteredDID : new RegisteredDID(db.collections.registeredDIDs)
  };
}