(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.common.controller:MainController
     *
     * @description
     * Controller responsável pela página Main
     */
    function mainCtrl( $rootScope, StorageService ) {
        var vm = this;

        _init();

        function _init(){
            $rootScope.profile = StorageService.findUser();
        }
    }

    angular.module("artApp.common").controller("MainCtrl", mainCtrl);

})();