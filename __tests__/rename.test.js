import reverse from '../src/rename.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/*test('reverse', () => {
    expect(reverse('hello')).toEqual('oll--eh');
    expect(reverse('')).toEqual('');
});*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('reverse', () => {
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8' );

    const html = readFile('text.html');
    const result = readFile('some.json')
    expect(reverse(html)).toEqual(result);
});
