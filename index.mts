#!/usr/bin/env bun

import strings from './strings';
import commandLineArgs from 'command-line-args';
import init from './lib/init';
import info from './lib/info';
import { getDb, loadDb } from './lib/database';

const options = commandLineArgs([
  { name: 'action', type: String, defaultOption: true },
  { name: 'help', type: Boolean },
  { name: 'target', type: String },
  { name: 'source', type: String, group: 'loadDb' },
  { name: 'local', type: Boolean, group: 'init' },
]);

(async () => {
  global.strings = (await strings()).default;
  
  switch (options._all.action || 'help') {
    case 'help':
      console.log(global.strings.intro);
      console.log(global.strings.help);
      break;
    case 'init':
      init({...options._all, ...options.init});
      break;
    case 'info':
      info(options._all);
      break;
    case 'pulldb':
      getDb(options._all);
      break;
    case 'pushdb':
      loadDb({...options._all, ...options.loadDb});
      break;
    default:
      console.log(global.strings.intro);
      console.log(global.strings.noArgs);
      console.log(global.strings.help);
      break;
  }
})();