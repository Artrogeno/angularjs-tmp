function waitForAuth( AuthService ){
    // $waitForAuth returns a promise so the resolve waits for it to complete
    return AuthService.waitForAuth();
}

function requireAuth( AuthService ){
    // $requireAuth returns a promise so the resolve waits for it to complete
    return AuthService.requireAuth();
}

function config($stateProvider) {

    $stateProvider
    .state('auth', {
        url: '/auth',
        abstract: true,
        controller: 'AuthCtrl as vm',
        templateUrl: 'modules/admin/views/auth.html'
    })
    .state('login', {
        url: '/login',
        controller: 'LoginCtrl as vm',
        templateUrl: 'modules/admin/views/login.html',
        resolve: { 
            currentAuth     : waitForAuth
        }
    })
    .state('auth.dashboard', {
        url: '/dashboard',
        controller: 'DashCtrl as vm',
        templateUrl: 'modules/admin/views/dash.html',
        resolve: { 
            currentAuth     : requireAuth,
            breadcrumb      : function(BreadcrumbFactory){
                return BreadcrumbFactory.getBread( 'dashboard' );
            }
        }
    })
    .state('auth.skills', {
        url: '/skills',
        controller: 'SkillsCtrl as vm',
        templateUrl: 'modules/admin/views/skills.html',
        resolve: { 
            currentAuth     : requireAuth, 
            breadcrumb      : function(BreadcrumbFactory){
                return BreadcrumbFactory.getBread( 'skills' );
            }
        }
    });
}

angular.module('artApp.admin').config(config);