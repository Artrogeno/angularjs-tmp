(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.common.controller:ngModal
     *
     * @description
     * Controller responsável pela página Main
     */
    function ngModal($rootScope) {
        
        var directive = {
            restrict: "E",
            link: link,
            //template: '<div ng-if="setTemplate" ng-include="setTemplate" class="idea-panel" ng-class="{\'open\': openPanel}"></div>'
            template: '<div ng-if="setTemplate" ng-include="setTemplate" class="modal fade" ng-class="{\'show ds-block\': open}"></div>'
        };

        return directive;


        function link(scope, element, attrs) {
            attrs.$observe("modalTemplate",function(uri){
                if(angular.isDefined(uri) && uri.length)
                    scope.setTemplate = uri;
                //$anchorScroll();
            });
            attrs.$observe("modalOpen",function(open){
                scope.open = ( angular.isDefined( open ) && open !== 'false' ? true : false );
                if(scope.open === true){
                    angular.element('body').addClass('modal-open');
                    $( 'body > div' ).after( '<div class="modal-backdrop fade show"></div>' );
                    //<div class="modal-backdrop fade show"></div>
                }else{
                    angular.element('body').removeClass('modal-open');
                    $( '.modal-backdrop' ).remove();
                }
            });
            attrs.$observe("modalSize",function(size){
                scope.size = size;
            });

            scope.dismiss = function(){
                $rootScope.modal.open = false;
            };

            
        }
            
    }

    angular.module("artApp.common").directive("ngModal", ngModal);

})();