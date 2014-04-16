var wheel = require('uniwheel');
var objectility = require('objectility');

//the name of your plugin
var pluginName = 'omniscroll-wheel';
var source = 'wheel';

//the plugin constructor
var plugin = function(omniscroll,options) {

  var settings = {
    wheelFactor: 1,
    preventDefault: true
  };

  var delta = 0;

  objectility.extendOwn(settings,options);

  function onEvent(e) {

    if (settings.preventDefault) {
      e.preventDefault();
    }

    delta = e.deltaY * settings.wheelFactor;

    omniscroll.consume(delta,source);
  }

  //exposed interface
  return {
    bind: function(element) {
      wheel.on(element,onEvent);
    },
    unbind: function(element) {
      wheel.off(element,onEvent);
    }
  }

};

module.exports = function(omniscroll,options) {
  return omniscroll.plugin(pluginName,plugin(omniscroll,options));
};