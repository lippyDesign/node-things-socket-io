const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Hrusha';
    const text = 'Hello World'
    const message = generateMessage(from ,text);
    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA('number');
  });
});