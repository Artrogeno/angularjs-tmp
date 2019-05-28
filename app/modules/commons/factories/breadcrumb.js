(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.site.service:BreadcrumbFactory
     *
     * @description
     * service responsável fazer comunicacao com o github api
     */
    function breadcrumbFactory($rootScope) {

        $rootScope.breadcrumb = {};

        var factory = {
            getBread: _getBread
        };

        return factory;

        function _getBread( path ){            
            if( path === 'dashboard')
                $rootScope.breadcrumb = { icon    : 'fa fa-pie-chart', title   : 'Dashboard' };
            if( path === 'skills')
                $rootScope.breadcrumb = { icon    : 'fa fa-code', title   : 'Skills' };
            return true;
        }
    }

    angular.module("artApp.common").factory("BreadcrumbFactory", breadcrumbFactory);

})();