var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', ()=> {
  it('should generate correct message', ()=> {
    var from = 'user1';
    var text = 'testtext1';

    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
})
