
//获取样式
function getStyle(obj,attr){

	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(document.getElementById(obj),false)[attr]

}

//设置随机数
function rdm(n,m){
	return parseInt(Math.random()*(m-n)+n)
}


/***********获取class***********/
//判断值是否存在于数组
function findInArr(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
}
function getByClass(obj, sClass) {
    var aResult = []; //存on
    var aEle = obj.getElementsByTagName('*'); //所有元素
    for (var i = 0; i < aEle.length; i++) {
        //判断有没有on这个class
        var aClass = aEle[i].className.split(' ');
        //根据findInarr比较有没有
        if (findInArr(aClass, sClass)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
