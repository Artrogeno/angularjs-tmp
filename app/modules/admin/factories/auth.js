(function () {
    "use strict";

    /**
     * @ngdoc service
     * @name artApp.common.service:AuthFactory
     *
     * @description
     * Factory responsável fazer o auth com o firebase
     */

    function authFactory($firebaseAuth, CONST_FIREBASE) {
        var ref = new Firebase(CONST_FIREBASE.databaseURL);
        return $firebaseAuth(ref);
    }
    angular.module("artApp.admin").factory("AuthFactory", authFactory);

})();
