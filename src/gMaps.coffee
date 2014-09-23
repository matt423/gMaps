class @gMaps extends Module
  @include Exceptions, Markers, Listeners
  defaults:
    className: "gMaps"
    center:
      lat: 52, lng: 1
    zoom: 8

  constructor: (@element, options = {}) ->
    @markers = []
    @settings = $.extend({}, @defaults, options)
    if @elementId()
      @addMap()
      @defaultCenter()

  addMap: ->
    @element.addClass @settings.className
    @map = new google.maps.Map(@element[0], @mapOptions());

  mapOptions: ->
    @getMapSettings ||= zoom: @settings.zoom, center: @settings.center

  elementId: ->
    id = @element.attr "id"
    if id? then id else @throwNoId()

  defaultCenter: ->
    @mapCenter = @settings.center

  center: (mapCenter) ->
    @mapCenter = mapCenter?= @mapCenter
    @setCenter()
    @mapCenter

  latLng: (lat, lng) ->
    new google.maps.LatLng lat, lng

  setCenter: ->
    @map.setCenter(@mapCenter)
