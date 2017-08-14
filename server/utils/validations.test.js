var expect = require('expect');

var {isRealString} = require('./validations.js');

describe('isRealString', ()=> {
  it('should reject non-string values', ()=> {
    var num = 123;
    expect(isRealString(num)).toBe(false);
  });
  it('should reject string with only spaces', ()=> {
    expect(isRealString('     ')).toBe(false);
  });
  it('should allow string with non space characters', ()=> {
    expect(isRealString('fdjkf')).toBe(true);
  })
})
