/////////////////////
/* metaweather.com */
/////////////////////


//https://www.metaweather.com/api/

// Dayly weather forecast. Seems to be 1 per day, also for actual day.
// There are only 10 places for Germany...


// 1. search woeid
// https://www.metaweather.com/api/location/search/?lattlong=52.4499231,13.317781
// response:

let results = [
  {
    "distance": 3920,
    "title": "Berlin",
    "location_type": "City",
    "woeid": 638242,
    "latt_long": "52.516071,13.376980"
  },
  {
    "distance": 150199,
    "title": "Leipzig",
    "location_type": "City",
    "woeid": 671072,
    "latt_long": "51.3452,12.38594"
  },
  {
    "distance": 166057,
    "title": "Dresden",
    "location_type": "City",
    "woeid": 645686,
    "latt_long": "51.053631,13.74081"
  },
  {
    "distance": 250348,
    "title": "Hanover",
    "location_type": "City",
    "woeid": 657169,
    "latt_long": "52.372269,9.73815"
  },
  {
    "distance": 255719,
    "title": "Hamburg",
    "location_type": "City",
    "woeid": 656958,
    "latt_long": "53.553341,9.992450"
  },
  {
    "distance": 281760,
    "title": "Prague",
    "location_type": "City",
    "woeid": 796597,
    "latt_long": "50.079079,14.433220"
  },
  {
    "distance": 316115,
    "title": "Bremen",
    "location_type": "City",
    "woeid": 641142,
    "latt_long": "53.075089,8.8047"
  },
  {
    "distance": 353479,
    "title": "Copenhagen",
    "location_type": "City",
    "woeid": 554890,
    "latt_long": "55.676311,12.569350"
  },
  {
    "distance": 379786,
    "title": "Nuremberg",
    "location_type": "City",
    "woeid": 680564,
    "latt_long": "49.454342,11.07349"
  },
  {
    "distance": 423294,
    "title": "Dortmund",
    "location_type": "City",
    "woeid": 645458,
    "latt_long": "51.516609,7.458290"
  }
]

// 2. get lowest distance
// sort array, take 1st one.
// results.sort( (a, b) => a.distance - b.distance );
// oder gleich auf results[0] vertrauen. Scheint ja aufsteigend sortiert zu sein. (immer?)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce



// 3. get Weather data from woeid (638242)
// It's a dayly forecast including today. I don't think the first one is the actual weather.... is it?
// `https://www.metaweather.com/api/location/${woeid}/`
// response:

const example = {
  "consolidated_weather": [
    {
      "id": 6341963517263872,
      "weather_state_name": "Light Rain",
      "weather_state_abbr": "lr",
      "wind_direction_compass": "WSW",
      "created": "2019-03-18T20:16:53.232925Z",
      "applicable_date": "2019-03-18",
      "min_temp": 4.49,
      "max_temp": 8.015,
      "the_temp": 7.795,
      "wind_speed": 12.598963293101619,
      "wind_direction": 254.12514236831117,
      "air_pressure": 1010.8199999999999,
      "humidity": 71,
      "visibility": 8.362724190726158,
      "predictability": 75
    },
    {
      "id": 5691366300450816,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "WNW",
      "created": "2019-03-18T20:16:56.713436Z",
      "applicable_date": "2019-03-19",
      "min_temp": 1.0499999999999998,
      "max_temp": 8.27,
      "the_temp": 8.085,
      "wind_speed": 7.811017028990694,
      "wind_direction": 291.1674666447692,
      "air_pressure": 1025.21,
      "humidity": 66,
      "visibility": 13.5412317068321,
      "predictability": 71
    },
    {
      "id": 6127286187196416,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "WSW",
      "created": "2019-03-18T20:16:59.316140Z",
      "applicable_date": "2019-03-20",
      "min_temp": -1.1,
      "max_temp": 12.22,
      "the_temp": 10.58,
      "wind_speed": 7.026813410999761,
      "wind_direction": 245.49992382679238,
      "air_pressure": 1032.5,
      "humidity": 66,
      "visibility": 13.728264435695538,
      "predictability": 71
    },
    {
      "id": 6661811778617344,
      "weather_state_name": "Showers",
      "weather_state_abbr": "s",
      "wind_direction_compass": "W",
      "created": "2019-03-18T20:17:02.817720Z",
      "applicable_date": "2019-03-21",
      "min_temp": 5.01,
      "max_temp": 12.83,
      "the_temp": 11.475,
      "wind_speed": 5.0732946591505605,
      "wind_direction": 264.66908038147403,
      "air_pressure": 1033.77,
      "humidity": 83,
      "visibility": 11.86135468861847,
      "predictability": 73
    },
    {
      "id": 5324743798423552,
      "weather_state_name": "Light Cloud",
      "weather_state_abbr": "lc",
      "wind_direction_compass": "SW",
      "created": "2019-03-18T20:17:05.428055Z",
      "applicable_date": "2019-03-22",
      "min_temp": 3.275,
      "max_temp": 15.45,
      "the_temp": 13.32,
      "wind_speed": 4.226945871873592,
      "wind_direction": 231.64931091340387,
      "air_pressure": 1032.7649999999999,
      "humidity": 76,
      "visibility": 11.856694404676688,
      "predictability": 70
    },
    {
      "id": 5564336233775104,
      "weather_state_name": "Light Cloud",
      "weather_state_abbr": "lc",
      "wind_direction_compass": "SSE",
      "created": "2019-03-18T20:17:08.429759Z",
      "applicable_date": "2019-03-23",
      "min_temp": 3.015,
      "max_temp": 16.4,
      "the_temp": 17.24,
      "wind_speed": 2.8239499323948145,
      "wind_direction": 167.5,
      "air_pressure": 1025.88,
      "humidity": 61,
      "visibility": 9.997862483098704,
      "predictability": 70
    }
  ],
  "time": "2019-03-18T21:54:42.537915+01:00",
  "sun_rise": "2019-03-18T06:14:47.882384+01:00",
  "sun_set": "2019-03-18T18:15:31.152663+01:00",
  "timezone_name": "LMT",
  "parent": {
    "title": "Germany",
    "location_type": "Country",
    "woeid": 23424829,
    "latt_long": "51.164181,10.454150"
  },
  "sources": [
    {
      "title": "BBC",
      "slug": "bbc",
      "url": "http://www.bbc.co.uk/weather/",
      "crawl_rate": 180
    },
    {
      "title": "Forecast.io",
      "slug": "forecast-io",
      "url": "http://forecast.io/",
      "crawl_rate": 480
    },
    {
      "title": "HAMweather",
      "slug": "hamweather",
      "url": "http://www.hamweather.com/",
      "crawl_rate": 360
    },
    {
      "title": "Met Office",
      "slug": "met-office",
      "url": "http://www.metoffice.gov.uk/",
      "crawl_rate": 180
    },
    {
      "title": "OpenWeatherMap",
      "slug": "openweathermap",
      "url": "http://openweathermap.org/",
      "crawl_rate": 360
    },
    {
      "title": "Weather Underground",
      "slug": "wunderground",
      "url": "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
      "crawl_rate": 720
    },
    {
      "title": "World Weather Online",
      "slug": "world-weather-online",
      "url": "http://www.worldweatheronline.com/",
      "crawl_rate": 360
    },
    {
      "title": "Yahoo",
      "slug": "yahoo",
      "url": "http://weather.yahoo.com/",
      "crawl_rate": 180
    }
  ],
  "title": "Berlin",
  "location_type": "City",
  "woeid": 638242,
  "latt_long": "52.516071,13.376980",
  "timezone": "Europe/Berlin"
}

// 4. Get Icon
// lr is from example.consolidated_weather[0].weather_state_abbr
// https://www.metaweather.com/static/img/weather/lr.svg



// Location Day... I won't need it. My first thought was this is the forecast.
// https://www.metaweather.com/api/location/woeid/dateString
// dateString in format yyy/mm/dd

// 5.a) Date method to get the next 3 days from actual day:
/* 
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

// 5.b)
let dateString = date.getFullYear().toString() + "/" + (date.getMonth()+1).toString() + "/" + date.getDate().toString();
 */