class @gMaps

  defaults:
    className: "gMaps"
    center:
      lat: 1, lng: 1
    zoom: 8

  constructor: (@element, options = {}) ->
    @settings = $.extend({}, @defaults, options)
    @addMap() if @elementId()

  addMap: ->
    @element.addClass @settings.className
    @map = new google.maps.Map(@element[0], @mapOptions());

  mapOptions: ->
    @getMapSettings ||= zoom: @settings.zoom, center: @settings.center

  elementId: ->
    id = @element.attr "id"
    if id? then id else exceptions().noId()

  center: (@mapCenter = @mapCenter) ->
    if center? then @setCenter() else @mapCenter

  @latLang: (lat, lang) ->
    new google.maps.LatLng lat, lang

  setCenter:  ->
    @mapCenter = @map.setCenter(@mapCenter)

  exceptions = ->
    @gMapsExceptionsClass ||= new gMapsExceptions

class @gMapsExceptions
  noId: -> throw "Element has no id"
