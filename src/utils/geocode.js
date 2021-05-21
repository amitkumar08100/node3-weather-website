const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1pdGt1bWFyMDgxMDAiLCJhIjoiY2tvc2RlaHlqMDBlbjJycDcxZnRnN2ZlaSJ9.50dy7siY4EFr21741AwA-w&limit=1`;
    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to Geocding service.', undefined);
        } else if(!body.features.length){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const [longitude, latitude] = body.features[0].center;
            callback(undefined, {
                longitude,
                latitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;