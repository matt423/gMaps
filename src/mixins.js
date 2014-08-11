(function() {
  var moduleKeywords,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = Array.prototype.slice;

  moduleKeywords = ['extended', 'included'];

  this.Module = (function() {

    function Module() {}

    Module.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) this[key] = value;
      }
      if ((_ref = obj.extended) != null) _ref.apply(this);
      return this;
    };

    Module.include = function() {
      var key, mixin, mixins, value, _i, _len, _ref;
      mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = mixins.length; _i < _len; _i++) {
        mixin = mixins[_i];
        for (key in mixin) {
          value = mixin[key];
          if (__indexOf.call(moduleKeywords, key) < 0) this.prototype[key] = value;
        }
        if ((_ref = mixin.included) != null) _ref.apply(this);
      }
      return this;
    };

    return Module;

  })();

}).call(this);
