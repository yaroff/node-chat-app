var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', ()=> {
  it('should generate correct message', ()=> {
    var from = 'user1';
    var text = 'testtext1';

    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = 'user1';
    var latitude = 1;
    var longitude = 1;
    var url = 'http://www.google.com/maps?q=1,1';

    var locationMessage = generateLocationMessage(from, latitude, longitude);
    expect(locationMessage).toInclude({from, url});
    expect(locationMessage.createdAt).toBeA('number');
  });
})
