(function() {

  this.Listeners = {
    onClick: function(callback) {
      return this.addListener("click", callback);
    },
    addListener: function(listener, callback) {
      return google.maps.event.addListener(this.map, listener, function(event) {
        return callback(event);
      });
    }
  };

}).call(this);
