//noinspection JSHint,JSLint
"use strict";

var map;
var markerList = [];
var markers;

var appReady = false;

		function select(feature){
		var m = markerList[feature.id];
			
			map.fitBounds(markers.getBounds());
			//var m = markersList[this.model.id];
				setTimeout(function(){
					markers.zoomToShowLayer(m, function() {
						m.openPopup();
						createTimeLine(feature.properties[0].segments, feature.properties[0].color); 
						//m.bindPopup(popupContent).openPopup();
					});
				},600);
						
				setTimeout(function(){
				map.panTo( new L.LatLng(feature.geometry[0].coordinates[1], feature.geometry[0].coordinates[0]));
			},700);

		}


$(document).ready(function () {

    document.onselectstart = function() {
        return false;
    };


		var geoJsonData = 
		
		{
      "type": "FeatureCollection", 
      "features": [
        { 
          "type": "Feature", 
          "id":"1", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [76.775174,17.012534] 
            },
          "properties": {
              "location": "Jevargi, Gulbarga",
              "type": "Ecosan",
              "segments": [0,0,4,3,0,0,2,0],
              "color": "green"
              }
        },
        { 
          "type": "Feature", 
          "id":"2", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.291251,17.178282] 
            },
          "properties": {
              "location": "Sedam, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,0,0,1,0,0,0],
              "color": "red"           
              }
        },
        { 
          "type": "Feature", 
          "id":"3", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.155015,17.200226] 
            },
          "properties": {
              "location": "Malkhed, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,1,3,0,1,1,0],
              "color": "green"           
              }
        },
        { 
          "type": "Feature", 
          "id":"4", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.136025,17.249627] 
            },
          "properties": {
              "location": "Tengli, Gulbarga",
              "type": "Double Pit",
              "segments": [0,0,0,1,1,0,0,0],
              "color": "orange" 
              }
        },
        { 
          "type": "Feature", 
          "id":"5", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.130121,17.283453] 
            },
          "properties": {
              "location": "Village near Tengli, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,1,0,0,0,0,0],
              "color": "red"
              }
        },
        { 
          "type": "Feature", 
          "id":"6", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.151412,17.350647] 
            },
          "properties": {
              "location": "Kalgi 1, Gulbarga",
              "type": "Open Pit",
              "segments": [0,0,4,8,2,4,6,0],
              "color": "green"
              }
        },
        { 
          "type": "Feature", 
          "id":"7", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.155299,17.352929] 
            },
          "properties": {
              "location": "Kalgi 3, Gulbarga",
              "type": "Double Pit",
              "segments": [0,0,0,1,1,1,0,0],
              "color": "orange" 
              }
        },
        { 
          "type": "Feature", 
          "id":"8", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [77.049894,17.377989] 
            },
          "properties": {
              "location": "Hebbal, Gulbarga",
              "type": "Double Pit",
              "segments": [0,0,0,8,4,0,0,0],
              "color": "red"
              }
        },
        { 
          "type": "Feature", 
          "id":"9", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [76.572512,17.564257] 
            },
          "properties": {
              "location": "Aland 1, Gulbarga",
              "type": "Double Pit",
              "segments": [0,0,0,0,0,0,0,1],
              "color": "red"
              }
        },
        { 
          "type": "Feature", 
          "id":"10", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [76.560475,17.565380] 
            },
          "properties": {
              "location": "Aland 2, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,3,8,2,7,0,0],
              "color": "green"
              }
        },
        { 
          "type": "Feature", 
          "id":"11", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [76.568713,17.573603] 
            },
          "properties": {
              "location": "Aland 3, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,0,14,4,0,0,0],
              "color": "red"
              }
        },
        { 
          "type": "Feature", 
          "id":"12", 
          "geometry": { 
            "type": "Point", 
            "coordinates": [76.716890,17.516856] 
            },
          "properties": {
              "location": "Narona, Gulbarga",
              "type": "Septic Tank",
              "segments": [0,0,2,7,2,1,2,0],
              "color": "green",           
              }
        }
      ]
    };


	var waiting = setInterval(function(){
	
		if(!appReady){return;}
		
		clearInterval(waiting);
		
		var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/67221/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			key: 'BC9A493B41014CAABB98F0471D759707'
		});

		map = L.map('map')
				.addLayer(cloudmade);

		markers = new L.MarkerClusterGroup();

		
		
		var scope = angular.element("#toilet-list").scope();
		
		var geoJsonLayer = L.geoJson(geoJsonData, {
		
			onEachFeature: function (feature, layer) {
			
				var p = feature.properties;				
				
				layer.bindPopup('<div style="padding:10px;font-size:20px;"><div><b>'+ p.location +'</b></div><div><b>'+ p.type +'</b></div></div><div id="holder"></div><div style="margin-bottom:10px;font-weight:bold;"><div style="margin:0 30px 0 70px;float:left">Morning</div><div style="margin:0 20px;float:left">Noon</div><div style="margin:0 40px;float:left">Evening</div><div style="margin:0 20px 0 10px;">Night</div></div>');
				layer.on('click', function() {map.panTo( new L.LatLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0])); createTimeLine(p.segments, p.color); });
				
			},
			pointToLayer: function callback(feature, latlng){    
			
				var myIcon = L.icon({ 
					iconUrl: 'images/'+feature.properties.color+'.png', // pull out values as desired from the feature feature.properties.style.externalGraphic.
					iconSize: [25, 41],
					iconAnchor: [22, 94],
					popupAnchor: [-3, -76],
					shadowUrl: 'images/marker-shadow.png',
					shadowSize: [41, 41],
					shadowAnchor: [22, 94]
				});
				var marker = L.marker(latlng, {icon: myIcon});
				markerList[feature.id] = marker;
				return marker; 
			}  
		});
		markers.addLayer(geoJsonLayer);

		map.addLayer(markers);
		map.fitBounds(markers.getBounds());
		var scale = L.control.scale().addTo(map);
		
		scale.position = 'bottomleft';

	},400);
	
	

		
	
});

