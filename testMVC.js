// Class to represent a row in the address grid
function addressInfo(title, lat, long, fullName, type) {
	var self = this;
	self.title = title;
	self.location = {
		lat : lat,
		lng : long
	};
	self.fullName = fullName;
	self.type = type;
	switch (type) {
	case "Home":
		self.markerColor = 'ffb900';
		break;
	case "Resturant":
		self.markerColor = '00ff00';
		break;
	case "Shop":
		self.markerColor = '00b7ff';
		break;
	case "School":
		self.markerColor = 'cc00ff';
		break;
	default:
		self.markerColor = 'ff0059';
	}
}

// Class to represent the category drop down menu
function catregoryInfo(type) {
	var self = this;
	self.type = type;
}

// Overall view model for this screen, along with initial state
function AddressViewModel() {
	var self = this;

	// knock out observable
	self.chosenAddress = ko.observable("");
	self.currentFilter = ko.observable();
	self.categoryFilter = ko.observable();
	self.titleFilter = ko.observable();
	self.toggleList = ko.observable(false);

	// Function to toggle the list view on or off
	self.toggleHighlight = function() {
		self.toggleList(!self.toggleList());
	};

	// Category drop down Data
	self.category = ko.observableArray([ new catregoryInfo("Home"), 
            new catregoryInfo("Resturant"),	new catregoryInfo("Shop"), 
            new catregoryInfo("School") ]);

	// Marker Data
	self.addresses = ko
			.observableArray([
					new addressInfo('Home', 30.158896, -81.771326, "Home",
							"Home"),
					new addressInfo('Golden Corral', 30.152468, -81.750959,
							"Golden Corral", "Resturant"),
					new addressInfo('Texas Roadhouse', 30.154330, -81.748912,
							"Texas Roadhouse", "Resturant"),
					new addressInfo('Shrimp Shack', 30.150023, -81.754211,
							"Shrimp Shack", "Resturant"),
					new addressInfo('Papa Murphys', 30.155706, -81.748243,
							"Papa Murphys Piza", "Resturant"),
					new addressInfo('Starbucks', 30.150025, -81.752736,
							"Starbucks", "Resturant"),
					new addressInfo('Ross', 30.156289, -81.748889,
							"Ross Stores", "Shop"),
					new addressInfo('Marshalls', 30.148496, -81.753469,
							"Marshalls", "Shop"),
					new addressInfo('Academy Sports', 30.148459, -81.755304,
							"Academy_Sports_+_Outdoors", "Shop"),
					new addressInfo('Walmart', 30.137854, -81.768865,
							"Walmart", "Shop"),
					new addressInfo('Lighthous Christain', 30.165694,
							-81.750841, "Lighthous Christain school", "School"),
					new addressInfo('OP High', 30.162864, -81.744517,
							"Orange Park High School", "School"),
					new addressInfo('Lakeside Elementary', 30.150429,
							-81.746226, "Lakeside Elementary School", "School"),
					new addressInfo('Citizens High', 30.125528, -81.776265,
							"Citizens High School", "School"),
					new addressInfo('Ridgeview High', 30.132172, -81.794139,
							"Ridgeview High School (Florida)", "School"), ]);

	// Function to Highlight a marker by making it bounce
	self.goToAddress = function(addresses) {
		stopAllMarkerBounce();
		self.chosenAddress(addresses);
		for (i = 0; i < markers.length; ++i) {
			if (markers[i].id == addresses.title)
				google.maps.event.trigger(markers[i], 'click');
		}

	};

	// Function to enable drop down filter of the marker title
	self.titleFilter.subscribe(function(newValue) {
		if (self.titleFilter() != undefined) {
            self.currentFilter(newValue.title);
			//self.categoryFilter(undefined);
		}
        else{
            self.currentFilter("Reset");
            self.categoryFilter(undefined);
            }
	});

	// Function to enable drop down filter of the marker category
	self.categoryFilter.subscribe(function(newValue) {
		if (self.categoryFilter() != undefined) {
			self.currentFilter(newValue.type);
			//self.titleFilter(undefined);            
		}
        else{
             self.currentFilter("Reset");
             self.titleFilter(undefined);
            }
	});

	// Function that does the filtering of the marker title and category
	self.filterProducts = ko.computed(function() {
		hideMarkers();
		self.chosenAddress("");
		if (!self.currentFilter() || self.currentFilter() == 'Reset' ) {
			deleteMarkers();
			ko.utils.arrayForEach(self.addresses(), function(feature) {
				putMarker(feature);
				// showMarkers(feature);
			});
			return self.addresses();
		} else {
			return ko.utils.arrayFilter(self.addresses(), function(prod) {
				if (prod.type == self.currentFilter()) {
					showMarkers(prod);
					return prod.type == self.currentFilter();
				}
				if (prod.title == self.currentFilter()) {
					showMarkers(prod);
					return prod.title == self.currentFilter();
				}
			});
		}
	});
}

// Function that starts the MVVC once the google API is loaded
function startMVVC() {
	ko.applyBindings(new AddressViewModel());
}
