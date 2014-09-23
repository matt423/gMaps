(function() {

  describe("gMaps", function() {
    beforeEach(function() {
      this.mockGoogle = new GoogleApiMock();
      this.mockGoogle.mockAPI();
      this.mockGoogle.mockMap();
      this.mockGoogle.mockMarker();
      this.mockGoogle.mockEvent();
      this.element = $("<div id='maps-view'><div>");
      return this.maps = new gMaps(this.element, {
        center: {
          lat: 51.5,
          lng: -0.116667
        }
      });
    });
    describe("constructor", function() {
      it("should correctly merge the options with the defaults", function() {
        var mapOptions;
        mapOptions = this.maps.settings;
        return expect(mapOptions.center).toEqual({
          lat: 51.5,
          lng: -0.116667
        });
      });
      it("should create a map to the element passed", function() {
        return expect(this.element.hasClass(this.maps.settings.className)).toBe(true);
      });
      it("should throw an error if the element has no id", function() {
        return expect(function() {
          return new gMaps($("<div></div>"));
        }).toThrow("Element has no id");
      });
      return it("should initialize google maps to the variable maps", function() {
        return expect(this.maps.map).not.toBe(void 0);
      });
    });
    describe("center", function() {
      var newCenter;
      newCenter = {
        lat: 50.0,
        lng: 1.23
      };
      it("should set the center of the map if parameters are passed", function() {
        return expect(this.maps.center(newCenter)).toEqual(newCenter);
      });
      return it("should return the center if no parameters are passed", function() {
        this.maps.center(newCenter);
        return expect(this.maps.center()).toEqual(newCenter);
      });
    });
    describe("addMarker", function() {
      it("should add the marker to the markers array", function() {
        this.maps.addMarker({
          lat: 52,
          lng: 1
        });
        return expect(this.maps.markers.length).toEqual(1);
      });
      it("should add the marker to the center of the map if the center option is passed", function() {
        this.maps.center({
          lat: 50.0,
          lng: 1.23
        });
        this.maps.addMarker({
          center: true
        });
        return expect({
          lat: 50.0,
          lng: 1.23
        }).toEqual(this.maps.center());
      });
      return it("should add the marker to location if center is not passed", function() {
        this.maps.center({
          lat: 50.0,
          lng: 1.23
        });
        this.maps.addMarker({
          lat: 34,
          lng: 1
        });
        return expect(this.maps.markers[0].getPosition()).toEqual({
          k: 34,
          B: 1
        });
      });
    });
    describe("destroyMarker", function() {
      beforeEach(function() {
        var marker;
        marker = this.maps.addMarker({
          center: true
        });
        return this.maps.destroyMarker(marker);
      });
      return it("should destroy the marker from the markers array", function() {
        return expect(this.maps.markers).toEqual([]);
      });
    });
    describe("destroyMarkers", function() {
      beforeEach(function() {
        var _i;
        for (_i = 1; _i <= 3; _i++) {
          this.maps.addMarker({
            lat: 34,
            lng: 1
          });
        }
        return this.maps.destroyMarkers();
      });
      return it("should destroy the marker from the markers array", function() {
        return expect(this.maps.markers).toEqual([]);
      });
    });
    return describe("onClick", function() {
      beforeEach(function() {
        return this.addListener = this.maps.onClick(this.callback);
      });
      return it("should add a click event listener to the map", function() {
        return expect(_.isFunction(this.addListener[0].events.click)).toBe(true);
      });
    });
  });

}).call(this);
