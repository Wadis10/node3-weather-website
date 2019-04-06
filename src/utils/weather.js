const request = require('request');

var getWeather = (latitude, longitude, callback) => {


request({
    url: 'https://api.darksky.net/forecast/c0d0093ca6c54b71b8f71572eeb42e03/' + latitude + ',' + longitude,
    json: true
}, (error, response, body) => {

   if (!error) {
       callback (undefined, {
           temperature: (body.currently.temperature-32)*5/9,
           apparentTemperature: (body.currently.apparentTemperature-32)*5/9,
           forecast: (body.hourly.summary)

       });
   } else {
       console.log(undefined);
   }
   


});
};

module.exports.getWeather = getWeather;