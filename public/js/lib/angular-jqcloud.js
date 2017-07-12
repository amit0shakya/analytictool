/*!
 * Angular jQCloud
 * For jQCloud 2 (https://github.com/mistic100/jQCloud)
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

angular.module('angular-jqcloud', []).directive('jqcloud', ['$parse', function($parse) {
  // get existing options
  var defaults = jQuery.fn.jQCloud.defaults.get(),
      jqcOptions = [];

  for (var opt in defaults) {
    if (defaults.hasOwnProperty(opt)) {
      jqcOptions.push(opt);
    }
  }

  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    scope: {
      words: '=words'
    },
    link: function($scope, $elem, $attr) {
      var options = {
        colors: ["#008AB8","#0099CC","#33ADD6","#66C2E0","#99D6EB","#B2E0F0","#CCEBF5"]
        //colors: ["#007AA3","#0099CC","#33ADD6","#66C2E0","#99D6EB","#CCEBF5","#E6F5FA"]
       // colors: ["#1c5785","#5598cc","#81bae6","#83bbe6","#567c99","#9cc6e6"]
       // colors: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc"],
       // shape: 'rectangular',
      // removeOverflowing: false

      };

      for (var i=0, l=jqcOptions.length; i<l; i++) {
        var opt = jqcOptions[i];
        var attr = $attr[opt] || $elem.attr(opt);
        if (attr !== undefined) {
          options[opt] = $parse(attr)();
        }
      }

      jQuery($elem).jQCloud($scope.words, options);

      $scope.$watchCollection('words', function() {
        $scope.$evalAsync(function() {
          var words = [];
          $.extend(words,$scope.words);
          jQuery($elem).jQCloud('update', words);
        });
      });

      $elem.bind('$destroy', function() {
        jQuery($elem).jQCloud('destroy');
      });
    }
  };
}]);
