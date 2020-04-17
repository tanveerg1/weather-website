const request = require('request');

const forecast = (longitude, latitude, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=f98541f7a709bf09d75918feceb7df82&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if(error){
            cb('Unable to connect to weather services!', undefined);
        } else if(body.error) {
            cb('Unable to find location!', undefined);
        } else {
            cb(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and it feels like ' + body.current.feelslike + ' out');
        }
    });
}

module.exports = forecast;