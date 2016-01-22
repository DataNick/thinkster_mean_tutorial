var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.test = 'Hello. I\'m listening',
    $scope.posts = ['post 1', 'post 2', 'post 3', 'post 4', 'post 5']
  }]);

// $scope is the bridge between controller and template