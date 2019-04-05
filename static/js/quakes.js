var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map features &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var recordCount = 1000;
var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;

d3.json(url, function(response) {
  
  var markers = L.markerClusterGroup();

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;
    var prop = response.features[i].properties
    console.log(location)

    if (location) {
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
      //  .bindPopup(response.features[i]));
       .bindPopup("<h3>Magnitude " + prop.mag + "<h3>"));
    }
  }

  myMap.addLayer(markers);
});
