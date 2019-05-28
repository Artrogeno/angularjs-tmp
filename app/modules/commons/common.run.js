(function () {
    "use strict";

    function run($state, $rootScope, $timeout, $location, firebase, CONST_FIREBASE){

        firebase.initializeApp(CONST_FIREBASE);
        var rootRef = firebase.database().ref();
        
        //$rootScope.$on('$stateChangeStart', function(event, next, nextParams, toState) {
        // $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        //      // AUTH REDIRECT
        //      console.log(toState.name);
        //     // if(  !authService.isAuthenticated() && toState.name != 'login') {
        //     //     event.preventDefault();
        //     //     $state.go('login');
        //     // }
			
        // });
    }
    
    angular.module("artApp.common").run(run);
})();