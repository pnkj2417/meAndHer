var moment=require('moment')
var generateMsg=function(from ,text){
    return {from :from, text:text, createdAt:new moment().valueOf()
    };
};
var generateLocationMsg=function(from ,latitude,longitude){
    return{
from,
url:`https://www.google.com/maps?q=${latitude},${longitude}`,
createdAt:new moment().valueOf()
    }
};
module.exports={generateMsg,generateLocationMsg};
