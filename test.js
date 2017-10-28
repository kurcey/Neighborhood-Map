var map;
var markers = [];
var placeMarkers = [];
var infowindow = null;
var bounds = null;

// Constructor creates a new map - only center and zoom are required.
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : 30.1589006,
			lng : -81.7735147
		},
		zoom : 13,
		mapTypeControl : false
	});
    bounds = new google.maps.LatLngBounds();
    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds); 
    });
	startMVVC();
}

// Style the markers a bit. This will be our listing marker icon.
function putMarker(locations) {
	var largeInfowindow = new google.maps.InfoWindow();
	var defaultIcon = makeMarkerIcon(locations.markerColor);
	var highlightedIcon = makeMarkerIcon('FFFF24');
	var position = locations.location;
	var title = locations.title;
	var marker = new google.maps.Marker({
		position : position,
		title : title,
		animation : google.maps.Animation.DROP,
		icon : defaultIcon,
		id : title
	});
	markers.push(marker);
	marker.addListener('click', function() {
		populateInfoWindow(this, largeInfowindow, locations);
		stopAllMarkerBounce();
		bounceMarker(this);
	});
	fitMarkers();
}

// This function is used to remove elements from Wikipedia page like tag
function removeTag(htmlContent) {
	var regex = /(<([^>]+)>)/ig;
	var result = htmlContent.replace(regex, "");
	return result;
}

// This function populates the info window when the marker is clicked.
// This also handles wikipedia 3rd Party API - including any errors
function populateInfoWindow(marker, infowindowPass, locations) {
	if (infowindow) {
		infowindow.close();
		infowindow.marker = null;
	}
	infowindow = infowindowPass;
	if (infowindow.marker != marker) {
		infowindow.setContent('');
		infowindow.marker = marker;
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});
		$.ajax({
					type : "GET",
					url : "http://en.wikipedia.org/w/api.php?action=mobileview&prop=text&sections=0&format=json&page="
							+ locations.fullName + "&callback=?",
					contentType : "application/json; charset=utf-8",
					async : true,
					dataType : "jsonp",
					success : function(data, textStatus, jqXHR) {
						if (!data.error) {
							var markup = data.mobileview.sections[0].text;
							markup = removeTag(markup);
							infowindow.setContent(markup);
						} else {
							infowindow
									.setContent("Hello user we were able to talk to the Wikibedia API <br>" +
											" but unfortunatly we got this error back '" +
											data.error.info +
											"<br>" +
											" We requested a page for this icon <b>" +
											locations.fullName + "</b>.");
						}
					},
					error : function(errorMessage) {
						infowindow
								.setContent("Hello user we were not able to talk to the Wikibedia API. <br>" +
										" We got this error back <b>'" +
										JSON.stringify(
												errorMessage.statusText, null,
												"  ") +
										"</b><br>" +
										" We requested a page for this icon <b>" +
										locations.fullName + "</b>.");
					}
				});
		infowindow.open(map, marker);
	}
}

// This function will loop through the markers array and display them all.
function fitMarkers() {
	google.maps.event.trigger(map, 'resize');
	//var bounds = new google.maps.LatLngBounds();
	for ( var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideMarkers() {
	if (infowindow)
		infowindow.close();
	for ( var i = 0; i < markers.length; i++) {
		markers[i].setVisible(false);
	}
}

// This function will display a selected marker.
function showMarkers(marker) {
	if (infowindow)
		infowindow.close();
	for ( var i = 0; i < markers.length; i++) {
		if (marker.title == markers[i].title)
			markers[i].setVisible(true);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for ( var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// This function takes in a COLOR, and then creates a new marker
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
					markerColor + '|40|_|%E2%80%A2', new google.maps.Size(21,
					34), new google.maps.Point(0, 0), new google.maps.Point(10,
					34), new google.maps.Size(21, 34));
	return markerImage;
}

// This function toggles a bouncing marker passed to it
function startMarkerBounce(markertoBounce) {
	for ( var i = 0; i < markers.length; i++) {
		if (markers[i].id == markertoBounce.title) {
			if (markers[i].getAnimation() !== null) {
				stopBounceMarker(markers[i]);
			} else {
				bounceMarker(markers[i]);
			}
		}
	}
}

// This function turns off all bouncing marker
function stopAllMarkerBounce() {
	for ( var i = 0; i < markers.length; i++) {
		stopBounceMarker(markers[i]);
	}
}

// This function turns on a bouncing marker passed to it
function bounceMarker(marker) {
	marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function() {
		stopBounceMarker(marker);
	}, 2800);
}

// This function turns off a bouncing marker passed to it
function stopBounceMarker(marker) {
	marker.setAnimation(null);
}
