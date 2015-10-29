/*
 * @ Name:   国信单面滑动通用方法
 * @ Time:   2015/8/12
 * @ Author: 繁花落尽|cici
 * @ Company: 国信安达
*/

var now = 1, last = 0;
const towards = { up:1, down:2 };
var isAnimating = false;
var len = $('.page').length;

//向上滑动
$('.wrap').swipeUp(function(){
    if (isAnimating) return;
    last = now;
    if(last<len){
        now = last+1; 
    }else{
        now = 1;
    }
    pageMove(towards.up);
})

//向下滑动
$('.wrap').swipeDown(function(){
    if (isAnimating) return;
    last = now;
    if(last>1){
        now = last-1; 
    }else{
        now = len;
    }
    pageMove(towards.down);
});



//滑动操作
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