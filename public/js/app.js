/* globals angular */
(function () {
  'use strict';

  var app = angular.module('angularCubbles', []);

  app.controller('mainCtrl', ['$scope', function ($scope) {
    // get reference to <co2-footprint> cubble
    var co2Footprint = document.getElementsByTagName('co2-footprint')[0];
    $scope.rangeValue = 20;

    // register watch listener as soon as CIF is ready
    $scope.$watch('rangeValue', function (newValue, oldValue) {
      // check if CRC finished initialising and thus  is ready
      if (window.cubx.CRC && window.cubx.CRC.isReady()) {
        // set value of slot "value" using generic setValue()
        co2Footprint.setValue(newValue);
      }
    });
  }]);
})();
