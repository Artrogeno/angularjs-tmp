function config($stateProvider, $httpProvider) {

    $stateProvider
    .state('app.home', {
        url: 'home',
        controller: 'HomeCtrl as vm',
        templateUrl: 'modules/site/views/home.html'
    });
}

angular.module('artApp.site').config(config);