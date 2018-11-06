const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', function() {
  it('should reject non-string values', function()  {
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', function() {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters',function ()  {
    var res = isRealString('D');
    expect(res).toBe(true);
  });
});
