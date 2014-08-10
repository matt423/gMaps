(function() {

  this.gMaps = (function() {
    var exceptions;

    gMaps.prototype.defaults = {
      className: "gMaps",
      center: {
        lat: 1,
        lng: 1
      },
      zoom: 8
    };

    function gMaps(element, options) {
      this.element = element;
      if (options == null) options = {};
      this.settings = $.extend({}, this.defaults, options);
      if (this.elementId()) this.addMap();
    }

    gMaps.prototype.addMap = function() {
      this.element.addClass(this.settings.className);
      return this.map = new google.maps.Map(this.element[0], this.mapOptions());
    };

    gMaps.prototype.mapOptions = function() {
      return this.getMapSettings || (this.getMapSettings = {
        zoom: this.settings.zoom,
        center: this.settings.center
      });
    };

    gMaps.prototype.elementId = function() {
      var id;
      id = this.element.attr("id");
      if (id != null) {
        return id;
      } else {
        return exceptions().noId();
      }
    };

    gMaps.prototype.center = function(mapCenter) {
      this.mapCenter = mapCenter != null ? mapCenter : this.mapCenter;
      if (typeof center !== "undefined" && center !== null) {
        return this.setCenter();
      } else {
        return this.mapCenter;
      }
    };

    gMaps.latLang = function(lat, lang) {
      return new google.maps.LatLng(lat, lang);
    };

    gMaps.prototype.setCenter = function() {
      return this.mapCenter = this.map.setCenter(this.mapCenter);
    };

    exceptions = function() {
      return this.gMapsExceptionsClass || (this.gMapsExceptionsClass = new gMapsExceptions);
    };

    return gMaps;

  })();

  this.gMapsExceptions = (function() {

    function gMapsExceptions() {}

    gMapsExceptions.prototype.noId = function() {
      throw "Element has no id";
    };

    return gMapsExceptions;

  })();

}).call(this);
