(function() {

  this.Markers = {
    addMarker: function(marker, infoWindow) {
      marker = new google.maps.Marker(this.markerOptions(marker));
      marker.setMap(this.map);
      this.markers.push(marker);
      return marker;
    },
    markerOptions: function(options) {
      if (options.center != null) {
        return {
          position: this.latLng(this.center().lat, this.center().lng)
        };
      } else {
        return {
          position: this.latLng(options.lat, options.lng)
        };
      }
    },
    destroyMarker: function(markerToDelete) {
      markerToDelete.setMap(null);
      return this.markers = this.markers.filter(function(marker) {
        return marker !== markerToDelete;
      });
    },
    destroyMarkers: function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.destroyMarker(marker));
      }
      return _results;
    }
  };

}).call(this);
