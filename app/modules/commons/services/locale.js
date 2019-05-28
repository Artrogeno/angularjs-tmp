
(function () {
    "use strict";
    /**
     * @ngdoc service
     * @name artApp.common.service:LocaleService
     *
     * @description
     * service responsável converter a liguegem
     */
    function localeService( $translate, CONST_LOCALES, $rootScope, tmhDynamicLocale ) {

        var service = {
            getLocaleDisplayName    : _getLocaleDisplayName,
            setLocaleByDisplayName  : _setLocaleByDisplayName,
            getLocalesDisplayNames  : _getLocalesDisplayNames
        };

        return service;

        // PREPARING LOCALES INFO
        var localesObj = CONST_LOCALES.locales;
        // locales and locales display names
        var _LOCALES = Object.keys(localesObj);
        if (!_LOCALES || _LOCALES.length === 0) {
            console.error('There are no _LOCALES provided');
        }
        var _LOCALES_DISPLAY_NAMES = [];
        _LOCALES.forEach(function (locale) {
            _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
        });
        // STORING CURRENT LOCALE
        var currentLocale = $translate.proposedLanguage();// because of async loading

        
        function _getLocaleDisplayName(){
            return localesObj[currentLocale];
        }

        function _setLocaleByDisplayName(localeDisplayName){
            _setLocale(
                _LOCALES[
                    _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
                ]
            );
        }

        function _getLocalesDisplayNames(){
            return _LOCALES_DISPLAY_NAMES;
        }



        function _setLocale(locale) {
            if (!checkLocaleIsValid(locale)) {
              console.error('Locale name "' + locale + '" is invalid');
              return;
            }
            currentLocale = locale;// updating current locale
            // asking angular-translate to load and apply proper translations
            $translate.use(locale);
        }

        function _checkLocaleIsValid(locale) {
            return _LOCALES.indexOf(locale) !== -1;
        }


        // EVENTS
        // on successful applying translations by angular-translate
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html
            // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
            tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
        });
        
    }

    angular.module("artApp.common").service("LocaleService", localeService);

})();