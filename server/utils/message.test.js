var expect=require('expect');
var {generateMsg, generateLocationMsg }=require('./message');
describe('generateMsg',function(){
    it('should generate correct message',function(){
    var from='jen';
    var text='some msg';
    var message=generateMsg(from,text);
   expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from,text });
    });

});

describe('generateLocationMsg', function()  {
    it('should generate correct location object', function()  {
      var from = 'Deb';
      var latitude = 15;
      var longitude = 19;
      var url = 'https://www.google.com/maps?q=15,19';
      var message = generateLocationMsg(from, latitude, longitude);
  
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, url});
    });
  });