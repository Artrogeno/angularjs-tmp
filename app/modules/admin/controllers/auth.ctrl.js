(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:HomeController
     *
     * @description
     * Controller responsável pela página Home
     */
    function authCtrl( $rootScope, $state, $timeout, StorageService, AuthService, CONST_FIREBASE ) {
        var vm = this;
        // Global Function
        $rootScope.logout = _logout;

        
        _init();

        function _init() {
            $rootScope.profile = StorageService.findUser();
        }

        function _logout(){
            AuthService.logout().then(_logoutSuccess, _logoutError);
        }

        function _logoutSuccess(){
            $timeout(function(){
                $state.go('login');
            },400);
        }

        function _logoutError(){
            console.log('error');
        }
    }

    angular.module("artApp.admin").controller("AuthCtrl", authCtrl);

})();