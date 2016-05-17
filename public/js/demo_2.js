(function(){
  'use strict';

  var app = angular.module('angularCubbles', []);

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

  var linkCubxComponent = function($scope, element) {
    // get local reference to Client Runtime Container (CRC)
    var CRC = window.cubx.CRC;
    // build custom event for starting bootstrap of CIF
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('CubxComponentLinked', true, true, {});


    // when CIF is ready set slot values given to directive via attribute "slotValues"
    document.addEventListener('cifReady', function() {
      // initially cal setSlots when cif is ready
      setSlots($scope, element);

      // register watcher for all slots available in $scope.slotValues object
      for(var slotName in $scope.slotValues) {
        if ($scope.slotValues.hasOwnProperty(slotName)) {
          $scope.$watch('slotValues.' + slotName + '.value', function(newValue, oldValue) {
            setSlots($scope, element);
          });
        }
      };
    });

    // dispatch event
    document.dispatchEvent(event);
  };

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
