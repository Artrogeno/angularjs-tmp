(function() {
    "use strict";

    /**
    * @ngdoc service
    * @name artApp.admin.service:SkillsService
    *
    * @description
    * Service responsável por realizar as chamadas HTTP para a API
    */

    function skillsService( $q, $timeout, FirebaseService ) {
        
        FirebaseService.fireCollect('skills');

        var service = {
            getSkills            : _getSkills,
        };

        return service;

        /**
         * @ngdoc method
         * @name _getSkills
         * @methodOf artApp.admin.service:SkillsService
         *
         * @returns {type} Retorna uma promise para o objeto que contém os Skillss.
         *
         * @description
         * Método responsável por buscar todos os Skillss da base
         */
        function _getSkills() {
            return FirebaseService.fireGetArray();
        }
    }

    angular.module("artApp.admin").service("SkillsService", skillsService);
})();