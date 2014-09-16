@Markers =
  addMarker: (marker, infoWindow) ->
    marker = new google.maps.Marker(@markerOptions(marker))
    marker.setMap @map
    @markers.push marker
    marker

  markerOptions: (options) ->
    if options.center?
      position: @latLng(@center().lat, @center().lng)
    else
      position: @latLng(options.lat, options.lng)

  destroyMarker: (markerToDelete) ->
    markerToDelete.setMap null
    @markers = @markers.filter (marker) -> marker isnt markerToDelete

  destroyMarkers: ->
    @destroyMarker(marker) for marker in @markers
