const request = require('postman-request')

const forecast = (long, lat,  callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fcbeb2cf57ca755a95d7040e212d4c35&query=' + lat + ',' + long + '&units=f'

    request ({url, json: true}, (error, { body }) => {
    // 
        if (error) {
            callback('Unable to connect to Weatherstack service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.  It feels like '
                 + body.current.feelslike + ' degrees.  The humidity is ' + body.current.humidity + '%.  The wind is from the ' + body.current.wind_dir + ' at ' + body.current.wind_speed + 'mph.')
        }
    })
}

module.exports = forecast
