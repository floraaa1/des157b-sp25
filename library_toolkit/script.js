(function () {
    'use strict';

    // add your script here

    window.addEventListener('DOMContentLoaded', function () {
        var granimInstance = new Granim({
          element: '#canvas-basic',
          direction: 'left-right',
          isPausedWhenNotInView: true,
          states: {
            "default-state": {
              gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
              ]
            }
          }
        });
    
    var map = L.map('map').setView([38.543239, -121.754686], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([38.543239, -121.754686]).addTo(map);
    var circle = L.circle([38.544078, -121.751910], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(map);

    var polygon = L.polygon([
        [38.539794,-121.749599],
        [38.539866, -121.747716],
        [38.538750, -121.751469]
    ]).addTo(map);

    marker.bindPopup("<b>Welcome!</b><br>This is my favorite place").openPopup();
    circle.bindPopup("I like playing tennis.");
    polygon.bindPopup("The most frequented place I go.");

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

    });
}());