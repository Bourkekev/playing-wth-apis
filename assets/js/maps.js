//Need to delare these first for Geolocating as a function hapeens outside of initMap
let map, infoWindow, flightPath;

function initMap() {
    //map options
    let options = {
        zoom: 12,
        center: {
            lat: 53.4256,
            lng: -6.1016
        }
    }
    map = new google.maps.Map(document.getElementById("map"), options);
    infoWindow = new google.maps.InfoWindow;

    // Listen for click event on map. 3 paramters the map to listen on (variable map), the event to listen for and a function and we pass the event into the function.
    google.maps.event.addListener(map, 'click', function(event){
        // add a marker with coords gotten from the event listener
        addMarker({coords:event.latLng});
    });

    /* SINGLE MAP MARKER
    var marker = new google.maps.Marker({
        position:  { lat: 53.4246, lng: -6.1210 },
        map: map,
        icon: iconBase + "beachflag.png"
    });

    //info window
    let infoWindow = new google.maps.InfoWindow({
        content: '<h2>Velvet Strand</h2><p>Portmarnock</p><h3>Hi Lynn!</h3>'
    });

    // need to add listener to listen for that info window
    marker.addListener('click', function(){
        infoWindow.open(map, marker)
    });
    END SINGLE MAP MARKER */

    // ADD MULTIPLE MARKERS
    //google maps icon base url
    let iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    

    // Array of Markers instead of individual addMarker calls. Place individual addMarker objects into this array
    let portoContent = `
        <h2>Velvet Strand</h2>
        <p>Portmarnock</p>
        <h3>Hi Lynn!</h3>
        <p><a href="https://www.visitdublin.com/see-do/details/portmarnock-the-velvet-strand-blue-flag-beach-2019" target="_blank">See more here</a></p>`
    let markers = [
        {
            coords:{lat: 53.4246, lng: -6.1210 },
            iconImage: iconBase + "beachflag.png",
            content: portoContent
        },
        {
            coords:{lat: 53.4509, lng: -6.1501 },
            iconImage: "http://maps.google.com/mapfiles/kml/pal2/icon27.png",
            content: '<h2>Party Village</h2><p>Malahide</p>'
        },
        {
            coords:{lat: 53.3786, lng: -6.0570 },
            iconImage: "http://maps.google.com/mapfiles/ms/micons/fishing.png",
            content: '<h2>Fishing Village</h2><p>Howth</p>'
        }
    ];

        //loop through markers
        for(let i = 0; i < markers.length; i++){
            addMarker(markers[i]);
        }

    //call addMarker and pass in coords
    // addMarker({
    //     coords:{lat: 53.4246, lng: -6.1210 },
    //     iconImage: iconBase + "beachflag.png",
    //     content: '<h2>Velvet Strand</h2><p>Portmarnock</p><h3>Hi Lynn!</h3>'
    // });
    // addMarker({
    //     coords:{lat: 53.4509, lng: -6.1501 },
    //     content: '<h2>Party Village</h2><p>Malahide</p>'
    // });
    // addMarker({
    //     coords:{lat: 53.3786, lng: -6.0570 },
    //     content: '<h2>Fishing Village</h2><p>Howth</p>'
    // });

    // Add marker function
    function addMarker(props){
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon: props.iconImage,
            //content: props.content
        });
        //test if icon image is there (setIcon is GM function). Prevents undefined value if left as above
        if(props.iconImage){
            marker.setIcon(props.iconImage);
        }
        
        // need to add listener to listen for that info window. Again test if true otherwise get info window with no info
        if(props.content){
            //info window
            let infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function(){
                infoWindow.open(map, marker)
            });
        }
    }

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          //add marker to your location. POS variable from right above
          let geoMarker = new google.maps.Marker({
            position: pos,
            map: map,
            //icon: props.iconImage,
            //content: props.content
          });
          
          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here.');
          infoWindow.open(map);
          geoMarker.addListener('click', function(){
            infoWindow.open(map, geoMarker)
        });
          // sets and overrides the map centering location
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

    // CI Code for map markers and clusters below
    //let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //array of objects
    // let locations = [
    //     { lat: 53.4256, lng: -6.1316 },
    //     { lat: 53.4509, lng: -6.1501 },
    //     { lat: 53.3786, lng: -6.0570 }
    // ];

    // let markers = locations.map(function(location, i) {
    //     return new google.maps.Marker({
    //         position: location,
    //         label: labels[i % labels.length]
    //     });
    // });

    // Add a marker clusterer to manage the markers.
    // var markerCluster = new MarkerClusterer(map, markers,
    //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    // TEST OUT POLYLINE
    let myTrip = [
        { lat: 53.4256, lng: -6.1316 },
        { lat: 53.4509, lng: -6.1501 },
        { lat: 53.3786, lng: -6.0570 }
    ];
    flightPath = new google.maps.Polyline({
        path: myTrip,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:1
    });
    // To use a POLYGON just use .Polygon in above example
    // call function to add line
    addLine();
}
function addLine() {
    // set the map to put polyline on
    flightPath.setMap(map);
  }

function removeLine() {
    flightPath.setMap(null);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}