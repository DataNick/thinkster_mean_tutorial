var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',

  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function (posts) {
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function ($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      });

    $urlRouterProvider.otherwise('home');
  }]);

app.factory('posts', ['$http', function($http) {
  var o = {
    posts: [] //any change made to $scope.posts in controller will be stored in this service and available to any other module that injects the posts service
  };

  // query the '/posts' route and bind a function when request returns
  // get back a list and copy to posts object using angular.copy() - see index.ejs
  o.getAll = function() {
    return $http.get('/posts').success(function (data) {
      angular.copy(data, o.posts);
    });
  };

  o.get = function (id) {
    return $http.get('/posts/' + id).then(function (res) {
      return res.data;
    });
  };

  // uses router.post in index.js to post a new Post model to mongoDB
  // when $http gets success, it adds this post to the posts object in local factory
  o.create = function (post) {
    //persistent data
    return $http.post('/posts', post).success(function (data) {
      o.posts.push(data);
    });
  };

  o.upvote = function (post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function (data) {
        post.upvotes += 1;
      });
  };

  o.addComment = function (id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  o.upvoteComment = function(post, comment) {
    console.log("checking o.upvote");
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data) {
        comment.upvotes += 1;
      });
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
      //persistent data
      posts.create({
        title: $scope.title,
        link: $scope.link,
        // upvotes: 0,
        // comments: [
        //   {author: 'Joe', body: 'Cool post!', upvotes: 0},
        //   {author: 'Bod', body: 'Nice post!', upvotes: 0}
        //   ]
        });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function (post) {
      posts.upvote(post);
    };
  }]);

app.controller('PostsCtrl', [
  '$scope',
  'posts',
  'post',
  function ($scope, posts, post) {
    $scope.post = post;
    $scope.addComment = function () {
      if($scope.body === '') { return; }
      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function (comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment) {
      console.log('comment upvote');
      posts.upvoteComment(post, comment);
    };

  }]);


// $scope is the bridge between controller and template; to make something available in template, bind it to $scope