(function($){

  $(document).ready(function(){

    // The main api url for Stories
    var $url = 'http://manystoriesoneheart.gr/api/v1.0/stories?filter[postal_address][value]=0&filter[postal_address][operator]=%22%3E%22';
    // The White tower lot/lan point
    var $thessaloniki = [40.6264251, 22.8783858];
    // Initialize empty array of points
    var $points = [];

    // Create the map
    var map = L.map("map");
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

    // Set the view to Thessaloniki point
    map.setView($thessaloniki, 15);

    // Get data from API with ajax
    $.ajax({
      type: 'GET',
      url: $url,
      success: function (results) {
        //console.log(results);
        $('.count-value').text(results.meta.count);
        $.each(results.data, function(index, element) {
          var $location = element.attributes.location;
          var $title = element.attributes.title;
          var $link = element.attributes.html_display;

          L.marker([$location.lat, $location.lon])
            .addTo(map)
            .bindPopup("<a href='"+$link+"'>" + $title + "</a>")
            .openPopup();
          //showPoint([$location.lat, $location.lon], $title);
          map.setView([$location.lat, $location.lon], 15);
          //console.log(element);
        });

      }
    });
  });

})(jQuery);
