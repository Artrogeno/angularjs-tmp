(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.site.service:gitHubService
     *
     * @description
     * service responsável fazer comunicacao com o github api
     */
    function gitHubService( $http ) {

        var uri = "https://api.github.com/users";
        
        var service = {
            getApi: _getApi
        };

        return service;

        function _getApi(){
            return $http.get( uri + '/artrogeno' );
        }
    }

    angular.module("artApp.site").service("GitHubService", gitHubService);

})();