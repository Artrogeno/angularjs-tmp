(function () {
    "use strict";
    /**
     * @ngdoc constants
     * @name artApp.common.constants:CONST_LOCALES
     *
     * @description
     * Constants CONST_LOCALES
     */
    var CONST_LOCALES = {
        locales: {
            'ru_RU': 'Русский',
            'en_US': 'English',
            'pt_BR': 'Português'
        },
        preferredLocale: 'pt_BR'
    };

    angular.module("artApp.common").constant("CONST_LOCALES", CONST_LOCALES);
    
})();