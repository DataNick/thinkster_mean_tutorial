var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',

  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }]);

app.factory('posts', [function() {
  var o = {
    posts: [] //any change made to $scope.posts in controller will be stored in this service and available to any other module that injects the posts service
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
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bod', body: 'Nice post!', upvotes: 0}
          ]
        });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    };
  }]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function ($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
  }]);


// $scope is the bridge between controller and template; to make something available in template, bind it to $scope