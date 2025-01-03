import fs from 'fs';

export const readFile = (file: string) => {
  try {
    const data = fs.readFileSync(file, 'utf8').toString();
    const input = data
      .split('\n')
      .filter(Boolean) // remove empty lines
      .join('\n');

    return input;
  }

  catch (e: any) {
    console.error(e);
    console.error(e.stack);
  }
};
