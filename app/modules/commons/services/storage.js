
(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.common.service:storageService
     *
     * @description
     * service responsável fazer comunicacao com o github api
     */
    function storageService( $sessionStorage ) {

        var storage = $sessionStorage;

        var service = {
            findUser    : _findUser,
            createUser  : _createUser,
        };

        return service;

        function _findUser(){
            // confere se o storage do usuario existe 
            if( angular.isUndefined(storage.user) ){
                return;
            }
            return storage.user;
        }

        function _createUser(data){
            // confere se o storage do usuario existe 
            if( angular.isUndefined(storage.user) ){
                storage.user = {};
            }
            storage.user = data;
        }
    }

    angular.module("artApp.common").service("StorageService", storageService);

})();