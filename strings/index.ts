// @ts-ignore
const language = (process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || process.env.LANGUAGE).split('.')[0];

const langFile = async () => {
  const d = await import('./default');
  try {
    const lang = await import(`./${language}`);
    return {...d, ...lang}
  } catch {
    return d;
  }
};

export default langFile;

