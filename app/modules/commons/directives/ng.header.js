(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.common.controller:ngNav
     *
     * @description
     * Controller responsável pela página Main
     */
    function ngHeader($window) {

        var directive = {
            restrict: 'AEC',
            templateUrl: 'modules/commons/templates/header.html',
            link: _link
        };

        return directive;

        function _link(scope, element, attrs) {

            var shrinkHeader = 300;
            $(window).scroll(function () {
                var scroll = _getCurrentScroll();
                if (scroll >= shrinkHeader) {
                    $('.header').addClass('top-off');
                }
                else {
                    $('.header').removeClass('top-off');
                }
            });
        }

        function _getCurrentScroll(){
            return window.pageYOffset || document.documentElement.scrollTop;
        }

    }

    angular.module("artApp.common").directive("ngHeader", ngHeader);

})();