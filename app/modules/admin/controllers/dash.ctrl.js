(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:DashCtrl
     *
     * @description
     * Controller responsável pela página Dash
     */
    function dashCtrl( $rootScope, $state, currentAuth ) {
        var vm = this;
        vm.profile = {};
        
        _init();

        function _init() {
            if( angular.isUndefined( currentAuth.uid ) )
                $state.go('auth.login');
            else
                vm.profile.email = currentAuth.email;
        }
    }

    angular.module("artApp.admin").controller("DashCtrl", dashCtrl);

})();