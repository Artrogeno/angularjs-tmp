(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.site.service:gitHubFactory
     *
     * @description
     * service responsável fazer comunicacao com o github api
     */
    function gitHubFactory() {

        var factory = {
            getApiToView: _getApiToView
        };

        return factory;

        function _getApiToView(res){
            if( angular.isUndefined(res) ){
                return;
            }
            if( angular.isUndefined(res.data) ){
                return;
            }
            var data   = res.data;
            
            return _facApi(data);
        }

        function _facApi( data ){
            var result = {};
            if( angular.isUndefined(data) ){
                return;
            }
            if( angular.isDefined(data.id) ){
                result.id = data.id;
            }
            if( angular.isDefined(data.login) ){
                result.login = data.login;
            }
            if( angular.isDefined(data.name) ){
                result.fullname = data.name;
            }
            if( angular.isDefined(data.public_repos) ){
                result.public_repos = data.public_repos;
            }
            if( angular.isDefined(data.public_gists) ){
                result.public_gists = data.public_gists;
            }
            if( angular.isDefined(data.followers) ){
                result.followers = data.followers;
            }
            if( angular.isDefined(data.following) ){
                result.following = data.following;
            }
            if( angular.isDefined(data.location) ){
                result.location = data.location;
            }
            if( angular.isDefined(data.company) ){
                result.company = data.company;
            }
            if( angular.isDefined(data.avatar_url) ){
                result.avatar = data.avatar_url;
            }
            return result;
        }
    }

    angular.module("artApp.site").factory("GitHubFactory", gitHubFactory);

})();