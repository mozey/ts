<template>
  <div>
    <div>{{ msg }}</div>
    <p>Weather for {{ lat }}, {{ lon }}</p>
    <ul>
      <li>Air temp {{ t0.temp }} degrees Celsius at {{ t0.timestamp }}</li>
      <li>Air temp {{ t1.temp }} degrees Celsius at {{ t1.timestamp }}</li>
      <li>Air temp {{ t2.temp }} degrees Celsius at {{ t2.timestamp }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

interface WeatherItem {
  timestamp: string
  temp: string
}

interface WeatherData {
  t0: WeatherItem
  t1: WeatherItem
  t2: WeatherItem
}

let t0: WeatherItem = {
  timestamp: "",
  temp: "",
}
let t1: WeatherItem = {
  timestamp: "",
  temp: "",
}
let t2: WeatherItem = {
  timestamp: "",
  temp: "",
}
let data: WeatherData = {
  t0: t0,
  t1: t1,
  t2: t2,
}

// What is Vue.extend for?
// https://stackoverflow.com/a/43509325/639133
export default Vue.extend({
  name: 'Weather',
  props: {
    msg: String,
    lat: String,
    lon: String,
  },
  data: function (): WeatherData {
    let url = "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?"
    url += "lat=" + this.lat + "&lon=" + this.lon
    let req = axios.get(url)
    req.then(function (resp) {
      if (resp.status == 200) {
        let ts = resp.data["properties"]["timeseries"][0]
        t0.timestamp = ts["time"]
        t0.temp = ts["data"]["instant"]["details"]["air_temperature"]
        ts = resp.data["properties"]["timeseries"][1]
        t1.timestamp = ts["time"]
        t1.temp = ts["data"]["instant"]["details"]["air_temperature"]
        ts = resp.data["properties"]["timeseries"][2]
        t2.timestamp = ts["time"]
        t2.temp = ts["data"]["instant"]["details"]["air_temperature"]
      }
    })
    // Data will be populated when req completes
    return data
  }
});
</script>

