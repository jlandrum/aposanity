import env from '../env';
import ct from 'chalk-template';

export default {
  intro: ct`
{blue.bold Aposanity ${env.version}}
Keeping Apostrophe Development Sane`,
  noArgs: ct`
{red You must supply a valid command}`,
  help: ct`
Commands:
  {bold help}: Shows this help; use --help to get help for any command.
  {bold init}: Creates an empty .aposanity.json file.
  {bold info}: Displays the available sites.
  {bold pulldb}: Fetches the database for a given site.
  {bold pushdb}: Write the database from a given site to another site.`,
  init: {
    help: ct`{bold Initializes Aposanity. Defaults to creating a global config.}

Arguments:
  {bold --local}: Creates a local config.`,
    exists: ct`{bold.red Config already exists}`
  },
  info: {
    help: ct`{bold This command will show you the currently scoped config.}`,
    isGlobal: ct`{bold.blue Loaded from global config}`,
    isLocal: ct`{bold.yellow Loaded from local config}`,
    availableSites: ct`{bold.green Available Sites}`,
  },
  getDb: {
    help: ct`{bold Pulls the database from the target enviroment.}

Arguments:
  {bold --target}: The target site to pull the database from. (if not provided, will use 'default')`,
    gettingDb: ct`{bold Getting database for}`,
    notExist: ct`{red is not a valid site.}\n{white Use info to see a list of available sites.}`,
    completed: ct`{bold Database saved to}`,
  },
  loadDb: {
    help: ct`{bold Pushes the database from a backup to the target enviroment.}

Arguments:
  {bold --source}: The site to load the database from.
  {bold --target}: The target site to pull the database from. (if not provided, will use 'default')`,
    writingDb1: ct`{bold Loading database from}`,
    writingDb2: ct`{bold into}`,
    notExist: ct`{bold.red is not a valid site.}\n{white Use info to see a list of available sites.}`,
    completed: ct`{bold Loaded database into}`,
  }
}