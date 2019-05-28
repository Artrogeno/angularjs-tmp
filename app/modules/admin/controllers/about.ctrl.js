(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:AboutCtrl
     *
     * @description
     * Controller responsável pela página About
     */
    function aboutCtrl( $rootScope, $state, AboutService, currentAuth ) {
        var vm = this;
        $rootScope.breadcrumb = {};
        vm.about = [];
        
        _init();

        function _init() {
            // Breadcrumb
            $rootScope.breadcrumb = {
                icon: 'fa fa-id-badge',
                title: 'About'
            };
            
            if( angular.isUndefined( currentAuth.uid ) )
                $state.go('auth.login');
            else
                AboutService.getAbout().then(_aboutSuccess, _aboutError);
        }

        function _aboutSuccess(response){
            vm.About = response;
        }

        function _aboutError(error){
            console.log(error);
        }

    }

    angular.module("artApp.admin").controller("AboutCtrl", aboutCtrl);

})();