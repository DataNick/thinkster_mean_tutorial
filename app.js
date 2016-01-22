var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.test = 'Hello. I\'m listening',
    $scope.posts = [{ title: 'post 1', upvotes: 5 }, { title: 'post 2', upvotes: 2 }, { title: 'post 3', upvotes: 15 }, { title: 'post 4', upvotes: 9 }, { title: 'post 5', upvotes: 4 }]
  }]);

// $scope is the bridge between controller and template; to make something available in template, bind it to $scope