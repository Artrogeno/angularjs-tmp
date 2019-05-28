/**
 * @ngdoc overview
 * @name artApp
 *
 * @description
 * Módulo principal da aplicação
 */
angular.module("artApp", [
    'ui.router',
    'satellizer',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngSanitize',
    'ngStorage',
    // 'ngCookies',
    'scrollto',
    "firebase",
    // 'pascalprecht.translate',// angular-translate
    // 'tmh.dynamicLocale',// angular-dynamic-locale
    "artApp.common",
    "artApp.site",
    "artApp.admin"
]);