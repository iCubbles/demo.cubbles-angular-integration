(function(){
  'use strict';

  var app = angular.module('angularCubbles', []);

  // create directive cubx-component
  app.directive('cubxComponent', [function() {
    return {
      restrict : 'E',
      templateUrl: 'cubx-component-tpl.html',
      scope: {
        cubxRoot: '=',
        slotValues: '='
      },
      link: linkCubxComponent
    };
  }]);

  // create controller
  app.controller('mainCtrl', ['$scope', function($scope) {
    $scope.rangeValue = 50;
    $scope.cubxRoot = 'https://cubbles.world/sandbox/com.incowia.demo.travel-planner@0.2.0-SNAPSHOT/co2-footprint/main';
    $scope.slotValues = {
      value : {
        value : $scope.rangeValue
      }
    };

    $scope.$watch('rangeValue', function(newValue, oldValue) {
      $scope.slotValues.value.value = newValue;
    });
  }]);

  // link function is called each time the directive cubx-component is instantiated
  var linkCubxComponent = function($scope, element) {
    // get local reference to Client Runtime Container (CRC)
    var CRC = window.cubx.CRC;
    // build custom event for starting bootstrap of CIF (here, use the deprecated way that also works in IE)
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('CubxComponentLinked', true, true, {});


    // when CIF is ready set slot values given to directive via scope property "slotValues"
    document.addEventListener('cifReady', function() {
      // initially call setSlots when cif is ready
      setSlots($scope, element);

      // register watcher for all slots available in $scope.slotValues object.
      // Here we only have a single input slot named "value". The iteration below could be part of a more generic solution
      for(var slotName in $scope.slotValues) {
        if ($scope.slotValues.hasOwnProperty(slotName)) {
          $scope.$watch('slotValues.' + slotName + '.value', function(newValue, oldValue) {
            setSlots($scope, element);
          });
        }
      };
    });

    // dispatch 'CubxComponentLinked' event
    document.dispatchEvent(event);
  };

  // set slot of cubbles component instance 'c2-footprint'
  var setSlots = function($scope, element) {
    var cubbleCompInstance = element.find('[cubx-dependency]')[0];

    if ($scope.slotValues) {
      for (var slotName in $scope.slotValues) {
        if ($scope.slotValues.hasOwnProperty(slotName)) {
          cubbleCompInstance.setInputSlot(slotName, {payload: $scope.slotValues[slotName].value})
        }
      }
    }
  }
})();
