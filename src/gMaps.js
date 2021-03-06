(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.gMaps = (function(_super) {

    __extends(gMaps, _super);

    gMaps.include(Exceptions, Markers, Listeners);

    gMaps.prototype.defaults = {
      className: "gMaps",
      center: {
        lat: 52,
        lng: 1
      },
      zoom: 8
    };

    function gMaps(element, options) {
      this.element = element;
      if (options == null) options = {};
      this.markers = [];
      this.settings = $.extend({}, this.defaults, options);
      if (this.elementId()) {
        this.addMap();
        this.defaultCenter();
      }
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
        return this.throwNoId();
      }
    };

    gMaps.prototype.defaultCenter = function() {
      return this.mapCenter = this.settings.center;
    };

    gMaps.prototype.center = function(mapCenter) {
      this.mapCenter = mapCenter != null ? mapCenter : mapCenter = this.mapCenter;
      this.setCenter();
      return this.mapCenter;
    };

    gMaps.prototype.latLng = function(lat, lng) {
      return new google.maps.LatLng(lat, lng);
    };

    gMaps.prototype.setCenter = function() {
      return this.map.setCenter(this.mapCenter);
    };

    gMaps.prototype.resize = function() {
      google.maps.event.trigger(this.map, 'resize');
      return this.map.setCenter(this.mapCenter);
    };

    return gMaps;

  })(Module);

}).call(this);
