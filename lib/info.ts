import getConfig from "./getConfig";

const init = async (args) => {
  if (args.help) {
    console.log(global.strings.init.help);
    return;
  }

  const config = await getConfig();

  const sites = Object.keys(config.sites);

  if (config.isGlobal) {
    console.log(global.strings.info.isGlobal);
  } else {
    console.log(global.strings.info.isLocal);
  }

  console.log(global.strings.info.availableSites);
  sites.forEach(key => console.log(key));

}

export default init;