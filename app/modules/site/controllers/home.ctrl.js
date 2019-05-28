(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.site.controller:HomeController
     *
     * @description
     * Controller responsável pela página Home
     */
    function homeCtrl( $rootScope, GitHubService, GitHubFactory, StorageService, SkillService ) {
        var vm = this;
        vm.gitUsers = {};

        _init();

        function _init() {
            vm.gitUsers = StorageService.findUser();
            if( !vm.gitUsers )
                GitHubService.getApi().then( _success, _error );
            SkillService.getSkill().then( _skillSuccess, _skillError );
        }

        function _success( response ){
            vm.gitUsers = GitHubFactory.getApiToView( response );
            $rootScope.profile = vm.gitUsers;
            StorageService.createUser( vm.gitUsers );
        }

        function _error(error){
            console.log(error);
        }

        function _skillSuccess( response ){
            console.log(response);
        }

        function _skillError( error ){
            console.log(error);
        }
    }

    angular.module("artApp.site").controller("HomeCtrl", homeCtrl);

})();