(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:SkillsCtrl
     *
     * @description
     * Controller responsável pela página skills
     */
    function skillsCtrl( $rootScope, $state, SkillsService, currentAuth ) {
        var vm = this;

        vm.skills = [];
        $rootScope.modal = {
            template: 'modules/admin/templates/modal.skills.html',
            open: false,
            size: 'modal-lg',
            title: null,
            param: {},
            theme: '',
            info: {
                title: null,
                theme: null,
                action: null,
            }
        };
        vm.openModalEdit    = _openModalEdit;
        vm.openModalCreate  = _openModalCreate;
        vm.openModalDelete  = _openModalDelete;

        _init();

        function _init() {
            if( angular.isUndefined( currentAuth.uid ) )
                $state.go('auth.login');
            else
                SkillsService.getSkills().then(_skillSuccess, _skillError);
        }

        function _skillSuccess(response){
            vm.skills = response;
        }

        function _skillError(error){
            console.log(error);
        }

        function _openModalCreate(){
            $rootScope.modal.open = true;
            $rootScope.modal.param = {};
            $rootScope.modal.info.title = "Create Skills";
            $rootScope.modal.info.theme = 'success';
            $rootScope.modal.info.action = 'Create';
        }

        function _openModalEdit(data){
            $rootScope.modal.open = true;
            $rootScope.modal.param = data;
            $rootScope.modal.info.title = "Edit Skills";
            $rootScope.modal.info.theme = 'info';
            $rootScope.modal.info.action = 'Update';
        }

        function _openModalDelete(data){
            $rootScope.modal.open = true;
            $rootScope.modal.param = data;
            $rootScope.modal.info.title = "Delete Skills";
            $rootScope.modal.info.theme = 'danger';
            $rootScope.modal.info.action = 'Delete';
        }

    }

    angular.module("artApp.admin").controller("SkillsCtrl", skillsCtrl);

})();