# Neighborhood-Map

# This project is for Kurt Wanliss to be used in the Udacity FullStack Web course.

#Purpose of this project:

Develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).

#Requirements of this project:
* 1. Download the Knockout framework. Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not. 
* 2. Asynchrony and Error Handling. Note that all data APIs used in the project should load asynchronously and errors should be handled gracefully. In case of error (e.g. in a situation where a third party API does not return the expected result) we expect your webpage to do one of the following: A message is displayed notifying the user that the data can't be loaded, OR There are no negative repercussions to the UI. Note: Please note that we expect students to handle errors if the browser has trouble initially reaching the 3rd-party site as well.
* 3. Write code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.
* 4.Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood. Your app should display those locations by default when the page is loaded.
* 5. Implement a list view of the set of locations.
* 6. Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time. Providing a search function through a third-party API is not enough to meet specifications. This filter can be a text input or a dropdown menu.
* 7. Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex: Yelp reviews, Wikipedia, Flickr images, etc). Note that StreetView and Places don't count as an additional 3rd party API because they are libraries included in the Google Maps API. 
* 8. Add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected.
* 9. Add functionality to open an infoWindow with the information (you can also populate a DOM element with this info, but you should still open an infoWindow, even with minimal info, like location name) when either a location is selected from the list view or its map marker is selected directly.
* 10. The app's interface should be intuitive to use. For example, the input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered. Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above the map marker with additional information.

## Instructions and pre-requisite to run the program:

*    Download all files included in this package and install on a webserver

*    Useing a webbrowser navigate to the downloaded file location and load the file test.html

* Bask in the beauty of the output!!!


#This Project has the following files and folders:

Main Directory
* 1 README.md
* 2 knockout-3.0.0.js
* 3 test.css
* 4 test.html
* 5 test.js
* 6 testMVC.js

Functions of each file

## README.md

    This readme file.
    
##knockout-3.0.0.js

    This file contains the knockout framework that makes the MVVC

##test.css

    This is the css styling for the page which also includes responsive functions handled with media queries

##test.html

    This is the html view of the page

#test.js

    This is the javascript that handels all the google API calls

##testMVC.js
    
    This is the Model view controler javascript that utilizes the knockout framework
