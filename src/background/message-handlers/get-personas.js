import * as db from '../../db';

export async function getPersonas(data, sender, sendResponse) {
  const { Persona } = await db.create();
  const personas = await Persona.query();
  const result = [];

  for (let p of personas) {
    result.push(p.toJSON());
  }

  return sendResponse(result);
}