import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { Persona } from './persona';
import { PersonaSchema } from './schemas/persona';

// if (import.meta.env.DEV) {
//   addRxPlugin(RxDBDevModePlugin);
// }

export async function create() {
  const db = await createRxDatabase({
    name: 'tbjank',
    storage: getRxStorageDexie()
  });

  await db.addCollections({
    personas: { schema: PersonaSchema }
  });

  return {
    Persona: new Persona(db.collections.personas)
  };
}