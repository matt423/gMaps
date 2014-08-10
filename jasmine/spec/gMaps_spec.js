(function() {

  describe("gMaps", function() {
    beforeEach(function() {
      this.mockGoogle = new GoogleApiMock();
      this.mockGoogle.mockAPI();
      this.mockGoogle.mockMap();
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
    return describe("center", function() {
      it("should set the center of the map if parameters are passed", function() {
        var newCenter;
        newCenter = {
          lat: 50.0,
          lng: 1.23
        };
        return expect(this.maps.center(newCenter)).toEqual(newCenter);
      });
      return it("should return the center if no parameters are passed", function() {
        var newCenter;
        newCenter = {
          lat: 50.0,
          lng: 1.23
        };
        this.maps.center(newCenter);
        return expect(this.maps.center()).toEqual(newCenter);
      });
    });
  });

}).call(this);
