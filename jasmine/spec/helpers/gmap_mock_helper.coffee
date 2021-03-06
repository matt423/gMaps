# Adapted from https://github.com/angular-ui/angular-google-maps/blob/develop/spec/coffee/helpers/google-api-mock.coffee
class @GoogleApiMock
  constructor: ->
  mockAPI: ->
    window.google = {}
    window.google.maps = {}

    # To make debugging easier, mock everything with exceptions
    unmocked = (api) => () => throw new String("Unmocked API " + api)
    window.google.maps.Marker = unmocked("Marker")
    window.google.maps.event =
      clearListeners: unmocked("event.clearListeners")
      addListener: unmocked("event.addListener")
      removeListener: unmocked("event.removeListener")
      trigger: unmocked("event.trigger")
    window.google.maps.OverlayView = unmocked("OverlayView")
    window.google.maps.InfoWindow = unmocked("InfoWindow")
    window.google.maps.LatLng = unmocked("LatLng")
    window.google.maps.MVCArray = unmocked("MVCArray")
    window.google.maps.Point = unmocked("Point")
    window.google.maps.LatLngBounds = unmocked("LatLngBounds")

  mockLatLng: (LatLng = (y, x) ->
    lat: () ->
      y
    lng: () ->
      x
  ) ->
    window.google.maps.LatLng = LatLng

  mockLatLngBounds: (LatLngBounds = () -> return) ->
    if not (LatLngBounds.extend?)
      LatLngBounds.prototype.extend = () -> return

    window.google.maps.LatLngBounds = LatLngBounds

  mockMap: ->
    Map = () ->
      @center =
        lat: -> 0
        lng: -> 0
      @controls = {
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
      }
      @getControls = -> return @controls
      @setZoom = -> return
      @setCenter = -> @
      @getCenter = -> return {lat: 47, lng: -27} unless Map.setCenter?
      @getCoords = -> return {latitude: 47, longitude: -27} unless Map.getCoords?
      return @
    @mockMapTypeId()
    @mockLatLng()
    @mockOverlayView()
    @mockEvent()
    window.google.maps.Map = Map

  mockControlPosition: ->
    ControlPosition =
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
    window.google.maps.ControlPosition = ControlPosition

  mockAnimation: (Animation = {BOUNCE: "bounce"}) ->
    window.google.maps.Animation = Animation

  mockMapTypeId: (MapTypeId = {ROADMAP: "roadmap"}) ->
    window.google.maps.MapTypeId = MapTypeId

  mockOverlayView: ->
    OverlayView = class OverlayView
      setMap:() -> @
    window.google.maps.OverlayView = OverlayView

  mockEvent: (event = {}) ->
    listeners = []
    #mocking google maps event listener
    if not event.addListener
      event.addListener = (thing, eventName, callBack) ->
        found = _.find listeners, (obj)->
          obj.obj == thing
        unless found?
          toPush = {}
          toPush.obj = thing
          toPush.events = {}
          toPush.events[eventName] = callBack
          listeners.push toPush
          listeners
        else
          found.events[eventName] = callBack

    if not event.clearListeners
      event.clearListeners = () ->
        listeners.length = 0

    if not event.removeListener
      event.removeListener = (item) ->
        index = listeners.indexOf(item)
        if index != -1
          listeners.splice(index)

    if not event.trigger
      event.trigger = (map, trigger) ->
        @

    unless event.fireListener
      event.fireListener = (thing, eventName) =>
        found = _.find listeners, (obj)->
          obj.obj == thing
        found.events[eventName](found.obj) if found?


    window.google.maps.event = event
    return listeners

  mockInfoWindow: (InfoWindow = () -> return) ->
    window.google.maps.InfoWindow = InfoWindow

  mockMarker: (Marker = @getMarker()) ->
    window.google.maps.Marker = Marker

  mockPoint: (Point = (x,y) -> return {x: x, y:y}) ->
    window.google.maps.Point = Point

  getMarker: ->
    Marker = (@opts) -> return

    Marker.prototype.getPosition = ->
      return k: @opts.position.lat(), B: @opts.position.lng()

    Marker.prototype.setMap = (map) -> return

    return Marker

  GoogleApiMock
