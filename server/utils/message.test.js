var expect=require('expect');
var {generateMsg}=require('./message');
describe('generateMsg',function(){
    it('should generate correct message',function(){
    var from='jen';
    var text='some msg';
    var message=generateMsg(from,text);
   expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from,text });
    });

});