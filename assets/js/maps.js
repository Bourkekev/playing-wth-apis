function initMap() {
    //map options
    let options = {
        zoom: 12,
        center: {
            lat: 53.4256,
            lng: -6.1016
        }
    }
    let map = new google.maps.Map(document.getElementById("map"), options);
    
    //google maps icon base url
    let iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    
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
}
