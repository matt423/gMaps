(function() {

  this.GoogleApiMock = (function() {

    function GoogleApiMock() {}

    GoogleApiMock.prototype.mockAPI = function() {
      var unmocked,
        _this = this;
      window.google = {};
      window.google.maps = {};
      unmocked = function(api) {
        return function() {
          throw new String("Unmocked API " + api);
        };
      };
      window.google.maps.Marker = unmocked("Marker");
      window.google.maps.event = {
        clearListeners: unmocked("event.clearListeners"),
        addListener: unmocked("event.addListener"),
        removeListener: unmocked("event.removeListener"),
        trigger: unmocked("event.trigger")
      };
      window.google.maps.OverlayView = unmocked("OverlayView");
      window.google.maps.InfoWindow = unmocked("InfoWindow");
      window.google.maps.LatLng = unmocked("LatLng");
      window.google.maps.MVCArray = unmocked("MVCArray");
      window.google.maps.Point = unmocked("Point");
      return window.google.maps.LatLngBounds = unmocked("LatLngBounds");
    };

    GoogleApiMock.prototype.mockLatLng = function(LatLng) {
      if (LatLng == null) {
        LatLng = function(y, x) {
          return {
            lat: function() {
              return y;
            },
            lng: function() {
              return x;
            }
          };
        };
      }
      return window.google.maps.LatLng = LatLng;
    };

    GoogleApiMock.prototype.mockLatLngBounds = function(LatLngBounds) {
      if (LatLngBounds == null) LatLngBounds = function() {};
      if (!(LatLngBounds.extend != null)) {
        LatLngBounds.prototype.extend = function() {};
      }
      return window.google.maps.LatLngBounds = LatLngBounds;
    };

    GoogleApiMock.prototype.mockMap = function() {
      var Map;
      Map = function() {
        this.center = {
          lat: function() {
            return 0;
          },
          lng: function() {
            return 0;
          }
        };
        this.controls = {
          TOP_CENTER: [],
          TOP_LEFT: [],
          TOP_RIGHT: [],
          LEFT_TOP: [],
          RIGHT_TOP: [],
          LEFT_CENTER: [],
          RIGHT_CENTER: [],
          LEFT_BOTTOM: [],
          RIGHT_BOTTOM: [],
          BOTTOM_CENTER: [],
          BOTTOM_LEFT: [],
          BOTTOM_RIGHT: []
        };
        this.getControls = function() {
          return this.controls;
        };
        this.setZoom = function() {};
        this.setCenter = function() {
          return this;
        };
        this.getCenter = function() {
          if (Map.setCenter == null) {
            return {
              lat: 47,
              lng: -27
            };
          }
        };
        this.getCoords = function() {
          if (Map.getCoords == null) {
            return {
              latitude: 47,
              longitude: -27
            };
          }
        };
        return this;
      };
      this.mockMapTypeId();
      this.mockLatLng();
      this.mockOverlayView();
      this.mockEvent();
      return window.google.maps.Map = Map;
    };

    GoogleApiMock.prototype.mockControlPosition = function() {
      var ControlPosition;
      ControlPosition = {
        TOP_CENTER: 'TOP_CENTER',
        TOP_LEFT: 'TOP_LEFT',
        TOP_RIGHT: 'TOP_RIGHT',
        LEFT_TOP: 'LEFT_TOP',
        RIGHT_TOP: 'RIGHT_TOP',
        LEFT_CENTER: 'LEFT_CENTER',
        RIGHT_CENTER: 'RIGHT_CENTER',
        LEFT_BOTTOM: 'LEFT_BOTTOM',
        RIGHT_BOTTOM: 'RIGHT_BOTTOM',
        BOTTOM_CENTER: 'BOTTOM_CENTER',
        BOTTOM_LEFT: 'BOTTOM_LEFT',
        BOTTOM_RIGHT: 'BOTTOM_RIGHT'
      };
      return window.google.maps.ControlPosition = ControlPosition;
    };

    GoogleApiMock.prototype.mockAnimation = function(Animation) {
      if (Animation == null) {
        Animation = {
          BOUNCE: "bounce"
        };
      }
      return window.google.maps.Animation = Animation;
    };

    GoogleApiMock.prototype.mockMapTypeId = function(MapTypeId) {
      if (MapTypeId == null) {
        MapTypeId = {
          ROADMAP: "roadmap"
        };
      }
      return window.google.maps.MapTypeId = MapTypeId;
    };

    GoogleApiMock.prototype.mockOverlayView = function() {
      var OverlayView;
      OverlayView = OverlayView = (function() {

        function OverlayView() {}

        OverlayView.prototype.setMap = function() {
          return this;
        };

        return OverlayView;

      })();
      return window.google.maps.OverlayView = OverlayView;
    };

    GoogleApiMock.prototype.mockEvent = function(event) {
      var listeners,
        _this = this;
      if (event == null) event = {};
      listeners = [];
      if (!event.addListener) {
        event.addListener = function(thing, eventName, callBack) {
          var found, toPush;
          found = _.find(listeners, function(obj) {
            return obj.obj === thing;
          });
          if (found == null) {
            toPush = {};
            toPush.obj = thing;
            toPush.events = {};
            toPush.events[eventName] = callBack;
            listeners.push(toPush);
            return listeners;
          } else {
            return found.events[eventName] = callBack;
          }
        };
      }
      if (!event.clearListeners) {
        event.clearListeners = function() {
          return listeners.length = 0;
        };
      }
      if (!event.removeListener) {
        event.removeListener = function(item) {
          var index;
          index = listeners.indexOf(item);
          if (index !== -1) return listeners.splice(index);
        };
      }
      if (!event.trigger) {
        event.trigger = function(map, trigger) {
          return this;
        };
      }
      if (!event.fireListener) {
        event.fireListener = function(thing, eventName) {
          var found;
          found = _.find(listeners, function(obj) {
            return obj.obj === thing;
          });
          if (found != null) return found.events[eventName](found.obj);
        };
      }
      window.google.maps.event = event;
      return listeners;
    };

    GoogleApiMock.prototype.mockInfoWindow = function(InfoWindow) {
      if (InfoWindow == null) InfoWindow = function() {};
      return window.google.maps.InfoWindow = InfoWindow;
    };

    GoogleApiMock.prototype.mockMarker = function(Marker) {
      if (Marker == null) Marker = this.getMarker();
      return window.google.maps.Marker = Marker;
    };

    GoogleApiMock.prototype.mockPoint = function(Point) {
      if (Point == null) {
        Point = function(x, y) {
          return {
            x: x,
            y: y
          };
        };
      }
      return window.google.maps.Point = Point;
    };

    GoogleApiMock.prototype.getMarker = function() {
      var Marker;
      Marker = function(opts) {
        this.opts = opts;
      };
      Marker.prototype.getPosition = function() {
        return {
          k: this.opts.position.lat(),
          B: this.opts.position.lng()
        };
      };
      Marker.prototype.setMap = function(map) {};
      return Marker;
    };

    GoogleApiMock;

    return GoogleApiMock;

  })();

}).call(this);
