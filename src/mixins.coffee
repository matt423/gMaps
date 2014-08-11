moduleKeywords = ['extended', 'included']

class @Module
  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value

    obj.extended?.apply(@)
    this

  @include: (mixins...) ->
    for mixin in mixins
      for key, value of mixin when key not in moduleKeywords
        # Assign properties to the prototype
        @::[key] = value

      mixin.included?.apply(@)
    this
