var generateMsg=function(from ,text){
    return {from :from, text:text, createdAt:new Date().getTime()
    };
};
var generateLocationMsg=function(from ,latitude,longitude){
    return{
from,
url:`https://www.google.com/maps?q=${latitude},${longitude}`,
createdAt:new Date().getTime()
    }
};
module.exports={generateMsg,generateLocationMsg};