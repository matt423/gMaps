@Listeners =
  onClick: (callback) ->
    @addListener("click", callback)

  addListener: (listener, callback) ->
    google.maps.event.addListener @map, listener, (event) ->
      callback(event)
