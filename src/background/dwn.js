import { Dwn } from '@tbd54566975/dwn-sdk-js';

let dwn;

export async function load() {
  if (!dwn) {
    dwn = await Dwn.create({});
  }

  return dwn;
}