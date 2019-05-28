(function () {
    "use strict";
    /**
     * @ngdoc constants
     * @name artApp.common.constants:CONST_FIREBASE
     *
     * @description
     * Constants CONST_FIREBASE
     */
    var CONST_FIREBASE = {
        apiKey: "AIzaSyCI1pdpEtUjQ8z8TXnfilAEPSr-Ae4-h1I",
        authDomain: "artrogenos.firebaseapp.com",
        databaseURL: "https://artrogenos.firebaseio.com",
        projectId: "artrogenos",
        storageBucket: "artrogenos.appspot.com",
        messagingSenderId: "631616919853"
    };

    angular.module("artApp.common").constant("CONST_FIREBASE", CONST_FIREBASE);
    
})();