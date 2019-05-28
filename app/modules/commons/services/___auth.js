(function() {
    "use strict";

    /**
    * @ngdoc service
    * @name artApp.common.service:authService
    *
    * @description
    * Service responsável por realizar as chamadas HTTP para a API
    */
    function authService($state, $timeout, angularAuth0) {

        var _userProfile = {};

        var service = {
            login                   :   _login,
            logout                  :   _logout,
            handleAuthentication    :   _handleAuthentication,
            isAuthenticated         :   _isAuthenticated,
            getProfile              :   _getProfile
        };

        return service;

        /**
         * @ngdoc method
         * @name _login
         * @methodOf artApp.site.service:authService
         *
         * @description
         * Método responsável autorizar o usuario
         */
        function _login() {
            if(!_isAuthenticated()){
                angularAuth0.authorize();
            }
        }

        /**
         * @ngdoc method
         * @name _logout
         * @methodOf artApp.site.service:authService
         *
         * @description
         * Método responsável Remove tokens and expiry time from localStorage
         */
        function _logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            $state.reload();
        }

        /**
         * @ngdoc method
         * @name _handleAuthentication
         * @methodOf artApp.site.service:authService
         *
         * @description
         * Método responsável por checar a autorizacao
         */
        function _handleAuthentication() {
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    _setSession(authResult);
                    $state.go('app.apontamento');
                } else if (err) {
                    $timeout(function() {
                        //$state.go('login');
                    });
                    console.log(err);
                }
            });
        }

        /**
         * @ngdoc method
         * @name _setSession
         * @methodOf artApp.site.service:authService
         *
         * @description
         * Método responsável setar a session no token do storage do navegador
         */
        function _setSession(authResult) {
            // Set the time that the access token will expire at
            var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
        }

        /**
         * @ngdoc method
         * @name _isAuthenticated
         * @methodOf artApp.site.service:authService
         *
         * @description
         * Método checa se estar autenticado
         */
        function _isAuthenticated() {
            // Check whether the current time is past the
            // access token's expiry time
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        /**
         * @ngdoc method
         * @name _isAuthenticated
         * @methodOf artApp.site.service:authService
         *
         * @returns {type} Retorna uma promise do perfil do usuario.
         * @description
         * Método responsavel por retornar o perfil do usuario
         */
        function _getProfile(cbSuccess, cbError) {
            if(angular.equals(_userProfile, {})){
                var accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    throw new Error('Access token must exist to fetch profile');
                }
                angularAuth0.client.userInfo(accessToken, function(err, profile) {
                    if(profile){
                        _userProfile = profile;
                        cbSuccess(profile);
                    }
                    else
                        cbError(err);
                });
            }
            else
                return _userProfile;
        }
    }

    angular.module("artApp.common").service("AuthService", authService);
})();