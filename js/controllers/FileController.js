app.controller('FileController', ['$scope', '$sce',
    function($scope, $sce) {
        $scope.file = {};
        $scope.loginMessage = "Log In";

        // Safely wait until the digest is finished before applying the ui change
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $scope.loadFile = function() {
            $scope.safeApply(
                $scope.file = loadFilePage($sce)
            );
        }
        $scope.loadFile();
    }]);

