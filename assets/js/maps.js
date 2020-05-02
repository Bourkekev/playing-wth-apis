function initMap() {
    //map options
    let options = {
        zoom: 10,
        center: {
            lat: 53.3498,
            lng: -6.2603
        }
    }
    let map = new google.maps.Map(document.getElementById("map"), options);
    
    //google maps icon base url
    let iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    
    var marker = new google.maps.Marker({
        position:  { lat: 53.4256, lng: -6.1316 },
        map: map
    });


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
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
