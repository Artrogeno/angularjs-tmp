(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name artApp.admin.controller:SkillsActionCtrl
     *
     * @description
     * Controller responsável pela página skills
     */
    function skillsActionCtrl( $rootScope, $state, SkillsService, ModalFactory, FirebaseService ) {
        var vm = this;
        vm.disabled         = false;
        vm.disabledClass    = null;
        vm.skill            = {};

        vm.createData       = _createData;
        vm.updateData       = _updateData;
        vm.deleteData       = _deleteData;

        _init();

        function _init() {
            // Config Firebase
            FirebaseService.fireCollect('skills');
            FirebaseService.fireAuth();

            vm.theme = ModalFactory.getTheme( $rootScope.modal.info.theme );
            if( angular.isDefined($rootScope.modal.param) )
                vm.skill = $rootScope.modal.param;
            if( $rootScope.modal.info.action == 'Delete'){
                vm.disabledClass = 'disabled';
                vm.disabled = true;
            }

            console.log(vm.skill);
        }

        function _createData(){
            FirebaseService.fireArraySave(vm.skill).then(_actionModalSucess, _actionModalError);
        }

        function _updateData(){
            FirebaseService.fireUpdate(vm.skill.$id, vm.skill).then(_actionModalSucess, _actionModalError);
        }

        function _deleteData(){
            FirebaseService.fireDelete(vm.skill.$id).then(_actionModalSucess, _actionModalError);
        }

        function _actionModalSucess(response){
            console.log( response );
            $rootScope.modal.open = false;
        }

        function _actionModalError(error){
            console.log( error );
        }
    }

    angular.module("artApp.admin").controller("SkillsActionCtrl", skillsActionCtrl);

})();