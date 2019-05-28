(function () {
    "use strict";

    function run($rootScope, $state) {

        // firebase.initializeApp(CONST_FIREBASE);

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            console.log(error);
            if (error === "AUTH_REQUIRED") {
                console.log('opa');
                //$state.go("auth.login");
            }
        });
        // $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
        //     console.log("$stateChangeStart " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
        // });
        // $rootScope.$on('$stateChangeSuccess', function () {
        //     console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
        // });
        // $rootScope.$on('$stateChangeError', function () {
        //     console.log("$stateChangeError " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
        // });

    }

    angular.module("artApp.admin").run(run);
})();