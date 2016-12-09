app.directive('driveAudioInfo', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/driveAudioInfo.html'
	};
});
