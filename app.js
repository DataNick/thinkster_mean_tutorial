var app = angular.module('flapperNews', []);

app.factory('posts', [function () {
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
  '$scope', 'posts',
  function ($scope, posts) {
    $scope.test = 'Hello. I\'m listening';
    $scope.posts = posts.posts;
    $scope.addPost = function () {
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({ title: $scope.title, link: $scope.link, upvotes: 0 });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    };
  }]);

// $scope is the bridge between controller and template; to make something available in template, bind it to $scope