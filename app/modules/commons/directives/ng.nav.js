(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.common.controller:ngNav
     *
     * @description
     * Controller responsável pela página Main
     */
    function ngNav( $rootScope ) {
        
        var directive = {
            restrict: 'AEC',
            templateUrl: 'modules/commons/templates/nav.html',
            // controller: 'AuthCtrl',
            // controllerAs: 'vm',
            scope: { 
              'profile': '=',
            },
            link: _link
        };
        
        return directive;

        function _link(scope, element, attrs){
            //$('.menu-item').addClass('menu-trigger');
            $('.menu-trigger').click(function(){
                $('#menu-trigger').toggleClass('clicked');
                $('.container-page').toggleClass('push');
                $('.menu-type').toggleClass( function(){//'open', 'close');
                    if ( $( this ).attr('class').indexOf('on') !== -1 ) {
                        $(this).removeClass('on');
                        return "off";
                    } else {
                        $(this).removeClass('off');
                        return "on";
                    }
                });
            });
            // Logout global
            scope.logout = $rootScope.logout;
        }
            
    }

    angular.module("artApp.common").directive("ngNav", ngNav);

})();