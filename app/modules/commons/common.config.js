function config($stateProvider, $httpProvider, $urlRouterProvider /*, $translateProvider, tmhDynamicLocaleProvider*/) {

    /*
    //$translateProvider.preferredLanguage('de_DE');
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
        prefix: 'modules/commons/i18n/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('en_US');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
    
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    */

    $urlRouterProvider.otherwise('home');

    $stateProvider
    .state('app', {
        url: '/',
        abstract: true,
        controller: 'MainCtrl as vm',
        templateUrl: 'modules/commons/views/main.html'
    });
}

angular.module('artApp.common').config(config);