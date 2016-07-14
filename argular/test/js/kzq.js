/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-14 10:52:45
 * @version $Id$
 */

	/*angular.module("myApp",[]).controller("myC",function($scope){
		$scope.firstName="Tom";
		$scope.lastName="Jerry";

		$scope.add=function(){
			return $scope.firstName+""+$scope.lastName
		}
	})*/

	angular.module("myApp",[]).controller("myC",function($scope){

		$scope.names=[{"姓名":"张三"},{"姓名":"张四"},{"姓名":"张五"}]
	})