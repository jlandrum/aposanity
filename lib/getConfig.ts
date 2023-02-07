import { promises } from 'fs';

const { readFile } = promises;

const getConfig = async () => {
  const global = await readFile(`${process.env.HOME}/.aposanity.json`)
    .then(it => JSON.parse(it.toString()))
    .catch(()=>({ sites: {} }));

  global.isGlobal = true;

  const local = await readFile(`.aposanity.json`)
    .then(it => JSON.parse(it.toString()))
    .catch(() => null);
 
  return local ? local : global;
}

export default getConfig;