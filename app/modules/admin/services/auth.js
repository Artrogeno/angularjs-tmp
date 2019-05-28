(function () {
    "use strict";

    /**
     * @ngdoc service
     * @name artApp.common.service:AuthService
     *
     * @description
     * Service responsável por realizar as chamadas HTTP para a API
     */
    function authService($q, firebase, $firebaseArray, $firebaseObject, $firebaseAuth, CONST_FIREBASE) {

        var _database = firebase.database();
        var _ref = _database.ref();
        var auth = $firebaseAuth();
        
        
        var service = {
            login           : _login,
            logout          : _logout,
            waitForAuth     : _waitForAuth,
            requireAuth     : _requireAuth
        };

        return service;

        /**
         * @ngdoc method
         * @name _login
         * @methodOf artApp.common.service:AuthService
         *
         * @param {string} email
         * @param {string} password
         *
         * @description
         * Método responsável logar na aplicacao
         */
        function _login( email, password ) {
            //auth.$getAuth()
            return $q(function(resolve, reject) {
                auth.$signInWithEmailAndPassword(email, password)
                .then(function(authData){
                    resolve(authData);
                }, function(error) {
                    reject(error);
                });
                // firebase.auth()
                // .signInWithEmailAndPassword( "root.arthur@gmail.com", "artrogeno123")
                // .then(function(authData){
                //     resolve(authData);
                // }, function(error) {
                //     reject(error);
                // });
            });
        }

        function _logout() {
            //auth.$getAuth()
            return $q(function(resolve, reject) {
                auth.$signOut()
                .then(function(authData){
                    resolve(authData);
                }, function(error) {
                    reject(error);
                });
            });
        }


        /**
        * @ngdoc method
        * @name _waitForAuth
        * @methodOf artApp.common.service:AuthService
        *
        * @description
        * Método responsável aguardar a authenticacao
        */
        function _waitForAuth() {
            return $q(function(resolve, reject) {
                auth.$waitForSignIn().then(function(authData){
                    resolve(authData);
                }, function(error) {
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name _requireAuth
         * @methodOf artApp.common.service:AuthService
         *
         * @description
         * Método responsável resolver se estiver authenticado
         */
        function _requireAuth() {
            return $q(function(resolve, reject) {
                auth.$requireSignIn().then(function(authData){
                    resolve(authData);
                }, function(error) {
                    reject(error);
                });
            });
        }

    }

    angular.module("artApp.common").service("AuthService", authService);

})();
