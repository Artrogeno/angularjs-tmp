(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.site.service:ModalFactory
     *
     * @description
     * service responsável fazer comunicacao com o github api
     */
    function modalFactory() {

        var factory = {
            getTheme: _getTheme
        };

        return factory;

        function _getTheme(res){
            if(angular.isUndefined(res))
                return {bg: null, fg: null};
            else if(res == 'info')
                return {bg: 'bg-info', fg: 'text-white'};
            else if(res == 'success')
                return {bg: 'bg-success', fg: 'text-white'};
            else if(res == 'danger')
                return {bg: 'bg-danger', fg: 'text-white'};
            else
                return {bg: null, fg: null};
        }
    }

    angular.module("artApp.site").factory("ModalFactory", modalFactory);

})();