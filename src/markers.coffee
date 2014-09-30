@Markers =
  addMarker: (marker, infoWindow) ->
    marker = new google.maps.Marker(@markerOptions(marker))
    @markers.push marker
    marker

  markerOptions: (options) ->
    map: @map
    position: @markerPosition(options)
    icon: @settings.markers.icon if @settings.markers?.icon?

  markerPosition: (options) ->
    if options.center?
      @latLng(@center().lat, @center().lng)
    else
      @latLng(options.lat, options.lng)

  destroyMarker: (markerToDelete) ->
    markerToDelete.setMap null
    @markers = @markers.filter (marker) -> marker isnt markerToDelete

  destroyMarkers: ->
    @destroyMarker(marker) for marker in @markers
