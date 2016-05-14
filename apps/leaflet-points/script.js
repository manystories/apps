(function($){

  $(document).ready(function(){

    // The main api url for Stories. Get the latest 30 Stories that have an address.
    var $url = 'http://manystoriesoneheart.gr/api/v1.0/stories?filter[postal_address][value]=0&filter[postal_address][operator]=%22%3E%22&range=30';
    // The White tower lot/lan point
    var $thessaloniki = [40.6171048, 22.9594983];

    // Debugging parameter
    var debug = false;

    // Create the map using Leaflet.markercluster.
    // More at https://github.com/Leaflet/Leaflet.markercluster.
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    });

    // Initial point to focus on.
    var latlng = L.latLng($thessaloniki);

    var map = L.map('map', {
      center: latlng,
      zoom: 13,
      layers: [tiles]
    });

    var markers = new L.markerClusterGroup();

    // Get data from API with ajax
    $.ajax({
      type: 'GET',
      url: $url,
      success: function (results) {
        //$('.count-value').text(results.meta.count);
        $.each(results.data, function(index, element) {
          var $location = element.attributes.location;
          var $title = element.attributes.title;
          var $link = element.attributes.html_display;
          var $address = element.attributes.postal_address;

          if (null != element.attributes.location) {
            var marker = L.marker(new L.LatLng($location['lat'], $location['lon']), {
              title: $title,
            });

            marker.bindPopup("<a href='"+$link+"'>" + $title + "</a><br>"+$address);
            markers.addLayer(marker);
          }

          // Debugging
          if (debug) {
            console.log(results);
            console.log($location);
          }
        });
        // Finally, add layer of the markers to the map.
        map.addLayer(markers);
      }
    });

  });

})(jQuery);
