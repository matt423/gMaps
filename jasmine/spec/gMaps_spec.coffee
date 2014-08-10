describe "gMaps", ->

  beforeEach ->
    @mockGoogle = new GoogleApiMock()
    @mockGoogle.mockAPI()
    @mockGoogle.mockMap()
    @element = $("<div id='maps-view'><div>")
    @maps = new gMaps @element,
      center: lat: 51.5, lng: -0.116667

  describe "constructor", ->

    it "should correctly merge the options with the defaults", ->
      mapOptions = @maps.settings
      expect(mapOptions.center).toEqual(lat : 51.5, lng : -0.116667)

    it "should create a map to the element passed", ->
      expect(@element.hasClass(@maps.settings.className)).toBe true

    it "should throw an error if the element has no id", ->
      expect(-> new gMaps($("<div></div>"))).toThrow("Element has no id")

    it "should initialize google maps to the variable maps", ->
      expect(@maps.map).not.toBe(undefined)

  describe "center", ->

    it "should set the center of the map if parameters are passed", ->
      newCenter = lat: 50.0, lng: 1.23
      expect(@maps.center(newCenter)).toEqual(newCenter)

    it "should return the center if no parameters are passed", ->
      newCenter = lat: 50.0, lng: 1.23
      @maps.center(newCenter)
      expect(@maps.center()).toEqual(newCenter)
