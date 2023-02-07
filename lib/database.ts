import getConfig from "./getConfig";
import ct from 'chalk-template';
import { execSync } from "child_process";
import { existsSync, mkdirSync, rmdirSync } from "fs";

export const getDb = async (args) => {
  if (args.help) {
    console.log(global.strings.getDb.help);
    return;
  }

  const config = await getConfig();
  const target = args.target || 'default';

  if (config.sites?.[target]) {
    const site = config.sites[target];
    const folder = `${config.isGlobal ? process.env.HOME : '.'}/.aposanity/${target}`;

    const command = site.useSSH ? 
      `ssh ${site.user}@${site.host} "mongodump --db=${site.database}" --archive --gzip >> ${folder}/db.gz` :
      `mongodump --uri="mongodb://${site.host}:${site.port}/${site.database}" --archive="${folder}/db.gz" --gzip `;

    console.log(ct`${global.strings.getDb.gettingDb} {bold.underline ${target}}\n`);

    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });    
    }

    execSync(command);

    console.log(ct`${global.strings.getDb.completed} {bold ${folder}}`);
  } else {
    console.error(ct`{red ${target}} ${global.strings.getDb.notExist}\n`);
  }
}

export const loadDb = async (args) => {
  if (args.help) {
    console.log(global.strings.loadDb.help);
    return;
  }

  const config = await getConfig();

  if (!args.source) {
    console.error('A source site must be specified');
    return;
  }
 
  const sourceName = args.source;
  const targetName = args.target || 'default';
  const source = config.sites[sourceName];
  const target = config.sites[targetName];
  
  if (source && target) {
    if (target.protected) {
      console.error('This site is protected from writing.');
      return;
    }

    if (target.useSSH) {
      console.error('Writing to a remote server using SSH is currently not supported.');
      return;
    }

    const sourceFolder = `${config.isGlobal ? process.env.HOME : '.'}/.aposanity/${sourceName}`;
    const command = `mongorestore --uri="mongodb://${target.host}:${target.port}/${source.database}" --archive=${sourceFolder}/db.gz --drop --gzip`;

    console.log(ct`${global.strings.loadDb.writingDb1} {bold.underline ${sourceName}} ${global.strings.loadDb.writingDb2} {bold.underline ${targetName}}`);

    execSync(command);

    console.log(ct`${global.strings.loadDb.completed} {bold ${targetName}}`);
  } else {
    console.error(ct`{bold ${target}} ${global.strings.loadDb.notExist}\n`);
  }
}