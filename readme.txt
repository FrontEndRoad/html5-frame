/* -------------------------------------------------------------
	@ 名称：移动H5场景模板
	@ 版本：v1.0
	@ 作者：繁花落尽|cici
	@ 时间：2015/10/15
*/

项目结构：
入口演示页：index.html
CSS文件组成：animate.css   动画库--公用 
             style.css     站点主样式
             small.css     小屏样式
JS文件组成： 引用jQuery/Zepto库
             viewport.js              视窗缩放
             pxloader-images.min.js   预加载
             pageSlide.js             全屏页面滑动效果【可自定义添加animate.css里面任意动画】
             base.js                  自己整理的JS库，主要包含横竖屏判断，背景音乐，判断设备，微信分享等功能
             main.js                  项目主JS，根据需求自己定义
music文件：  bg.mp3                 根据项目需求，添加背景音乐
images文件： 项目引用图片

滑屏部分核心代码：
function pageMove(tw){
    var lastPage = ".pg"+last,
        nowPage = ".pg"+now;

    switch(tw) {
        case towards.up:
            outClass = 'fadeOut';
            inClass = 'fadeIn delay300';
            break;

        case towards.down:
            outClass = 'fadeOut';
            inClass = 'fadeIn delay300';
            break;
    }
    isAnimating = true;
    $(nowPage).show();

    $(lastPage).addClass(outClass);
    $(nowPage).addClass(inClass);

    setTimeout(function(){
        $(lastPage).removeClass('current');
        $(lastPage).removeClass(outClass);
        $(lastPage).hide();
        $(lastPage).find("img, div").hide();

        $(nowPage).addClass('current');
        $(nowPage).removeClass(inClass);
        $(nowPage).find("img, div").show();

        isAnimating = false;
    },600);
}
封装一个滑屏动作方法，判断当前手势为swipeUp or swipeDown时，传入方向参数，调用此方法。动画添加通过outclass/inclass巧妙的控制，这里可根据规则引用animate.css库里的任意动画。

base.js 基础库，主要通过一个构造函数来存放当前项目基础功能，如下：
var Cici = function(file){}
Cici.prototype = {
	init: function(){ ... },
	orient: function(){ ... },
	device: function(){ ... }
}

通过main.js引用，如下：
var h5 = new Cici('您的项目名');   //这里传参，便于图片加载及分享调用
    h5.init();
    
建议：一般H5场景应用类项目，可把所有场景放置一个页面，便于控制及添加动画。同时，要做好图片压缩及代码优化等多方面工作。移动端项目总文件大小尽量控制在2M内，对于目前4G网络加载比较理想。
 
