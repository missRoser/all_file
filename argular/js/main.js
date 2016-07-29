/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-07-15 16:40:20
 * @version $Id$
 *功能    播放   暂停   下一首    上一首
 */

var app = angular.module("myApp", []);

app.controller("myC", function($scope, $http) {
    var myC = document.getElementById('myC');

    $scope.wait = false;

    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    var oSrc = 'http://pd.npr.org/npr-mp4/npr/sf/2013/12/20131213_sf_03.mp4?orgId=1&topicId=1144&d=1067&story=250730970&ft=nprml&f=61';
    $scope.audio.src = oSrc;
    $scope.audio.controls = 'controls';
    myC.appendChild($scope.audio)

    /**************播放*************/
    $scope.play = function() {
        //if ($scope.playing) $scope.audio.pause();
        $scope.audio.play();
        // 储存播放器的状态为正在播放
        $scope.playing = true;
    }
    /**********点击歌曲播放***********/
    $scope.player = function(program) {
        console.log(program)
        if ($scope.playing) $scope.audio.pause();
        var url = program && program.audio[0].format.mp4.$text
        $scope.audio.src = url;
        $scope.audio.play();
        // 储存播放器的状态为正在播放
        $scope.playing = true;
    }

    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };
    
    $scope.audio.addEventListener('ended', function() {
        $scope.$apply(function() {
            $scope.audio.stop()
        });
    });

    var data=LS.get('data');
    if(!data){
        $http({
            method: 'JSONP',
            url: 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON&apiKey=MDI1NDAxNzc0MDE0NjkwOTQ5MDAwYWIxMQ000&callback=JSON_CALLBACK'
        }).success(function(data, status) {
            $scope.oData = data;
            if ($scope.oData) {
                $scope.wait = true;
            }
            $scope.programs = $scope.oData.list.story;
            //console.log($scope.programs);
            $scope.sta = status;

            var oD_ls=LS.set('data',JSON.stringify($scope.oData))
        }).error(function() {

        });
    }else{
        $scope.oData=JSON.parse(data);
        if ($scope.oData) {
            $scope.wait = true;
        }
        $scope.programs = $scope.oData.list.story;
            //console.log($scope.programs);
        //$scope.sta = status;
    }

    

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