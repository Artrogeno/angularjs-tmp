(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.common.controller:ngNav
     *
     * @description
     * Controller responsável pela página Main
     */
    function ngLanguage($window) {

        var directive = {
            restrict: 'AEC',
            replace: true,
            template:   ''+
                        '<div class="language-select" ng-if="visible">'+
                            '<label>'+
                                '{{"directives.language-select.Language" | translate}}:'+
                                '<select ng-model="currentLocaleDisplayName"'+
                                    'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                                    'ng-change="changeLanguage(currentLocaleDisplayName)">'+
                                '</select>'+
                            '</label>'+
                        '</div>'+
                        '',
            controller: languageCtrl,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;


        function languageCtrl(LocaleService){
            var vm = this;
            vm.currentLocaleDisplayName = undefined;
            vm.localesDisplayNames = undefined;
            vm.visible = undefined;

            vm.changeLanguage = _changeLanguage;

            _init();

            function _init(){
                vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                vm.localesDisplayNames      = LocaleService.getLocalesDisplayNames();
                vm.visible = vm.localesDisplayNames && vm.localesDisplayNames.length > 1;
            }

            function _changeLanguage(locale) {
                LocaleService.setLocaleByDisplayName(locale);
            }
        }
    }

    angular.module("artApp.common").directive("ngLanguage", ngLanguage);

})();