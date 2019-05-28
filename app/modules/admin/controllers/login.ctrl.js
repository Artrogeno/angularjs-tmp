(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:LoginController
     *
     * @description
     * Controller responsável pela página Home
     */
    function loginCtrl( $state, AuthService, currentAuth ) {
        var vm = this;
        vm.email = null;
        vm.password = null;

        vm.login = _login;

        _init();

        function _init() {
            if( angular.isDefined(currentAuth) )
                _redirectAuth();
            else
                _getAuth();
        }

        function _login(){
            AuthService.login( vm.email, vm.password ).then(_loginSuccess, _loginError );
        }

        function _loginSuccess(response){
            $state.go('auth.dashboard');
        }

        function _loginError(error){
            vm.error = error;
        }

        function _getAuth(){
            console.log('opa');
        }

        function _redirectAuth(){
            $state.go('auth.dashboard');
        }
    }

    angular.module("artApp.admin").controller("LoginCtrl", loginCtrl);

})();