import fs from 'fs';

export const readFile = (file: string, raw: boolean = false) => {
  try {
    const data = fs.readFileSync(file, 'utf8').toString();
    if (raw) return data;

    return data
      .split('\n')
      .filter(Boolean) // remove empty lines
      .join('\n'); 
  }

  catch (e: any) {
    console.error(e);
    console.error(e.stack);
  }
};
