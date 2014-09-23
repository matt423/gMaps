describe "gMaps", ->

  beforeEach ->
    @mockGoogle = new GoogleApiMock()
    @mockGoogle.mockAPI()
    @mockGoogle.mockMap()
    @mockGoogle.mockMarker()
    @mockGoogle.mockEvent()
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
    newCenter = lat: 50.0, lng: 1.23
    it "should set the center of the map if parameters are passed", ->
      expect(@maps.center(newCenter)).toEqual(newCenter)

    it "should return the center if no parameters are passed", ->
      @maps.center(newCenter)
      expect(@maps.center()).toEqual(newCenter)

  describe "addMarker", ->

    it "should add the marker to the markers array", ->
      @maps.addMarker({lat: 52, lng: 1})
      expect(@maps.markers.length).toEqual(1)

    it "should add the marker to the center of the map if the center option is passed", ->
      @maps.center(lat: 50.0, lng: 1.23)
      @maps.addMarker({center: true})
      expect(lat: 50.0, lng: 1.23).toEqual(@maps.center())

    it "should add the marker to location if center is not passed", ->
      @maps.center(lat: 50.0, lng: 1.23)
      @maps.addMarker({lat: 34, lng: 1})
      expect(@maps.markers[0].getPosition()).toEqual({k: 34, B: 1})

  describe "destroyMarker", ->
    beforeEach ->
      marker = @maps.addMarker center: true
      @maps.destroyMarker marker

    it "should destroy the marker from the markers array", ->
      expect(@maps.markers).toEqual([])

  describe "destroyMarkers", ->
    beforeEach ->
      @maps.addMarker({lat: 34, lng: 1}) for [1..3]
      @maps.destroyMarkers()

    it "should destroy the marker from the markers array", ->
      expect(@maps.markers).toEqual([])

  describe "onClick", ->
    beforeEach ->
      @addListener = @maps.onClick @callback

    it "should add a click event listener to the map", ->
      expect(_.isFunction(@addListener[0].events.click)).toBe(true)
