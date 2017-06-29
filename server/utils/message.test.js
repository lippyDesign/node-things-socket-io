const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Hrusha';
    const text = 'Hello World'
    const message = generateMessage(from ,text);
    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA('number');
  });
});

describe('generate location message', () => {
  it('should generate curret location message', () => {
    const lat = 37.7726402;
    const long = -122.40991539999997;
    const from = 'Vovka Markovka';
    const locationMessage = generateLocationMessage(from, lat, long);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
  });
});