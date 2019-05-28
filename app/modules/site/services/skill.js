(function() {
    "use strict";

    /**
    * @ngdoc service
    * @name artApp.site.service:skillService
    *
    * @description
    * Service responsável por realizar as chamadas HTTP para a API
    */

    function skillService( $q, $timeout, FirebaseService ) {
        
        FirebaseService.fireCollect('skills');

        var service = {
            getSkill            : _getSkill,
        };

        return service;

        /**
         * @ngdoc method
         * @name _getSkill
         * @methodOf artApp.site.service:skillService
         *
         * @returns {type} Retorna uma promise para o objeto que contém os skills.
         *
         * @description
         * Método responsável por buscar todos os skills da base
         */
        function _getSkill() {
            return FirebaseService.fireGet();
        }
    }

    angular.module("artApp.site").service("SkillService", skillService);
})();