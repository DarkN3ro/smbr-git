import reverse from '../src/rename.js';

test('reverse', () => {
    expect(reverse('hello')).toEqual('o-l-l-e-h');
    expect(reverse('')).toEqual('');
});
