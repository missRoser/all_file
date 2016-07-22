/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-15 16:40:20
 * @version $Id$
 */

var app = angular.module("myApp", []);



app.controller("myC", function($scope, $http) {
	$scope.person={
		name:"Jerry"
	};

	$scope.wait=false;

	function toDou(num){
		return num<10&&num>=0?"0"+num:""+num
	}

	var updateClock = function() {
		var oDate=new Date();
    	$scope.clock = toDou(oDate.getFullYear())+"-"+toDou((oDate.getMonth()+1))+"-"+toDou(oDate.getDate())+"  "+toDou(oDate.getHours())+":"+toDou(oDate.getMinutes())+":"+toDou(oDate.getSeconds())
  	};
  	var timer = setInterval(function() {
    	$scope.$apply(updateClock);
  	}, 1000);
  	updateClock();

  	$scope.playing = false;
  	$scope.audio = document.createElement('audio');
  	$scope.audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/12/20131213_sf_03.mp4?orgId=1&topicId=1144&d=1067&story=250730970&ft=nprml&f=61';
  	$scope.play = function() {
    	$scope.audio.play();
    	$scope.playing = true;
  	};
  	$scope.stop = function() {
    	$scope.audio.pause();
    	$scope.playing = false;
  	};
  	$scope.audio.addEventListener('ended', function() {
    	$scope.$apply(function() {
	      	$scope.stop()
	    });
  	});

    $http({
        method: 'JSONP',
        url: 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON&apiKey=MDI1NDAxNzc0MDE0NjkwOTQ5MDAwYWIxMQ000&callback=JSON_CALLBACK'
    }).success(function(data, status) {
    	if(data){
    		$scope.wait=true;
    	}
        $scope.oData = data;
		$scope.programs = data.list.story;
        console.log(data);
        $scope.sta = status;
        $scope.play = function(program) {
		   if ($scope.playing) $scope.audio.pause();
		   var url = program.audio[0].format.mp4.$text;
		   $scope.audio.src = url;
		   $scope.audio.play();
		   // 储存播放器的状态为正在播放
		   $scope.playing = true; 
		}
    }).error(function() {

    })
})

//自定义指令  模板
app.directive("nprLink", function() {
   return {
     restrict: "EA",
     require: ["^ngModel"],
     replace: true,
     scope: {
       ngModel: "=",
       play: "&amp;"
     },
     templateUrl: "nprListItem.html",
     link: function(scope, ele, attr) {
       scope.duration = scope.ngModel.audio[0].duration.$text;
     }
   } 
});

app.run(function($rootScope) {

})