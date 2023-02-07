import commandLineArgs from 'command-line-args';
import { accessSync, writeFileSync, mkdirSync } from 'fs';

const defaultConfig = 
{
  sites: {
    default: {
      host: 'localhost',
      port: '27017',
      user: 'nodeapps',
      database: "db",
      version: 2
    }
  }
}

const init = (args) => {
  if (args.help) {
    console.log(global.strings.init.help);
    return;
  }

  const dir = args.local ? './.aposanity' : `${process.env.HOME}/.aposanity`;
  const target = args.local ? './.aposanity.json' : `${process.env.HOME}/.aposanity.json`;

  try {
    const f = accessSync(target);
    console.error(global.strings.init.exists);
  } catch {
    writeFileSync(target, JSON.stringify(defaultConfig, null, 2));
    mkdirSync(dir);
  }
}

export default init;