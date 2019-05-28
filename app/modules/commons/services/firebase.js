(function() {
    "use strict";

    /**
     * @ngdoc service
     * @name artApp.common.service:firebaseService
     *
     * @description
     * Service responsável por realizar as chamadas HTTP para a API
     */
    function firebaseService($q, $firebaseArray, $firebaseObject, $firebaseAuth) {

        var _database =  firebase.database();
        var _ref     =   _database.ref();
        var _collect;
        var _auth;

        var service = {
            fireCollect         : fireCollect,
            fireAuth            : fireAuth,
            fireGet             : fireGet,
            fireGetArray        : fireGetArray,
            fireFind            : fireFind,
            fireSave            : fireSave,
            fireArraySave       : fireArraySave,
            fireUpdate          : fireUpdate,
            fireDelete          : fireDelete,
            fireDestroy         : fireDestroy
        };

        return service;


         /**
         * @ngdoc method
         * @name fireCollect
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {string} model
         *
         * @description
         * Método responsável recuperar os dados
         */
        function fireCollect(model) {
            _collect = model;
        }

         /**
         * @ngdoc method
         * @name fireAuth
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {string} fireAuth
         *
         * @description
         * Método responsável auth user
         */
        function fireAuth() {
            _auth = $firebaseAuth();
        }

        /**
         * @ngdoc method
         * @name fireFind
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {int} id ID do registro
         *
         * @description
         * Método responsável recuperar os dados
         */
        function fireFind(data) {
            return $q(function(resolve, reject) {
                $firebaseObject(_ref.child( _collect ).child(data)).$loaded().then(function(response){
                    resolve(response);
                }, function(error){
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name fireGet
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {int} id ID do registro
         *
         * @description
         * Método responsável recuperar os dados
         */
        function fireGet() {
            return $q(function(resolve, reject) {
                $firebaseObject(_ref.child( _collect )).$loaded().then(function(response){
                    resolve(response);
                }, function(error){
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name fireGetArray
         * @methodOf artApp.common.service:firebaseService
         *
         * @description
         * Método responsável recuperar os dados
         */
        function fireGetArray() {
            return $q(function(resolve, reject) {
                var query = _ref.child( _collect ).orderByChild('updated_at');//.limitToLast(25);
                $firebaseArray(query).$loaded().then(function(response){
                    resolve( response );
                }, function(error){
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name fireSave
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {object} model Registro
         *
         * @description
         * Método responsável cadastrar ou atualizar (se for passado um ID) um registro
         */
        function fireSave(model) {
            _ref.child( _collect ).set( model || null );
        }

        /**
         * @ngdoc method
         * @name fireArraySave
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {object} model Registro
         *
         * @description
         * Método responsável cadastrar ou atualizar (se for passado um ID) um registro
         */
        function fireArraySave(model) {
            return $q(function(resolve, reject) {
                model.created_at = moment().format();
                model.updated_at = moment().format();
                var list = $firebaseArray( _ref.child( _collect ) );
                list.$add( model ).then(function(response) {
                    resolve(response);
                }, function(error){
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name fireUpdate
         * @methodOf artApp.common.service:firebaseService
         *
         * @description
         * Método responsável por listar os registros
         */
        function fireUpdate(schema, model) {
            var deferred = $q.defer();    
            var obj = $firebaseObject(_ref.child( _collect ).child(schema) );
            obj.$loaded().then(function(response){
                if(angular.isUndefined( model.created_at ) )
                    model.created_at = moment().format();
                model.updated_at = moment().format();

                angular.forEach(model, function(val, key) {
                    obj[key] = val;    
                });
                obj.$save().then(function(response){
                    deferred.resolve(response);
                },function(error){
                    deferred.reject(error);        
                });
            }, function(error){
                deferred.reject(error);        
            });
            return deferred.promise;       
        }

        /**
         * @ngdoc method
         * @name fireDelete
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {string} key ID do registro
         *
         * @description
         * Método responsável excluir um registro
         */
        function fireDelete(key) {
            return $q(function(resolve, reject) {
                $firebaseObject(_ref.child( _collect).child(key) ).$loaded().then(function(response){
                    _ref.child( _collect ).child(key).set(null);
                    resolve(response);
                }, function(){
                    reject(error);
                });
            });
        }

        /**
         * @ngdoc method
         * @name fireDestroy
         * @methodOf artApp.common.service:firebaseService
         *
         * @param {string} key ID do registro
         *
         * @description
         * Método responsável excluir um registro
         */
        function fireDestroy() {
            _ref.child( _collect ).set(null);
        }
    }

    angular.module("artApp.common").service("FirebaseService", firebaseService);

})();
