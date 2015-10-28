/* -------------------------------------------------------------
	@ 名称：移动H5学用方法集合
	@ 功能：横竖屏判断、背景音乐、判断设备、微信分享
	@ 版本：v1.0
	@ 作者：繁花落尽|cici
	@ 时间：2015/10/15
*/
var Cici = function(){
	this.hei = $(window).height();
	this.orientMsg = ['images/orient.png', '为了更好的体验，请使用竖屏浏览'];   //参数1：提示图片   参数2：提示文案
	this.musicMsg = ['music/bg.mp3', 'images/play.png', 'images/pause.png']; //参数1：音乐路径    参数2：播放图标   参数3：暂停图标
	this.deviceMsg = ['images/ewm.jpg', '手机扫码浏览网页效果更佳'];           //参数1：Pc下显示二维码  参数2：提示手机扫话术
	//this.shareMsg = ['要分享的标题', '要分享的话术', loc, loc+'images/share.jpg'];           //参数1：要分享的标题  参数2：要分享的话术  参数3：要分享的链接  参数4：要分享的图片路径
}

Cici.prototype = {
	init: function(){
		var ths = this;
		if(this.hei<960){
			$('head').append('<link rel="stylesheet" href="css/small.css" />');
		}

		//this.preload();
		this.orient();
		this.device();
		this.music();

		//添加事件
		document.addEventListener('touchstart', ths.stopSlide, false);
		$('.frm,.upDiv,.mIco').on('touchstart touchmove', function(){    //释放默认事件
	        document.removeEventListener('touchstart', ths.stopSlide, false);
	    }).on('touchend', function(){
	        document.addEventListener('touchstart', ths.stopSlide, false);
	    })
	},
	orient: function(){   //横竖屏提示
		var oriMsg = this.orientMsg; 
		function init(){
	       var htm = '<div id="orientLayer" class="orientLayer"><img src="'+oriMsg[0]+'" class="orientIcon"><div class="orientWrd">'+oriMsg[1]+'</div></div>'; 
	       var sty = '.orientLayer{height:100%;width:100%;background:rgba(0,0,0,.8);position:fixed;left:0;top:0;z-index:999;text-align:center}.orientIcon{width:67px;height:109px;margin-top:80px;transform:rotate(90deg);-webkit-transform:rotate(90deg);-webkit-animation:rotation infinite 1.5s ease-in-out;animation:rotation infinite 1.5s ease-in-out}.orientWrd{margin-top:20px;color:#fff;font:18px/1.5 Microsoft Yahei}@keyframes rotation{10%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}50%{transform:rotate(0);-webkit-transform:rotate(0)}60%{transform:rotate(0);-webkit-transform:rotate(0)}90%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}100%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}}@-webkit-keyframes rotation{10%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}50%{transform:rotate(0);-webkit-transform:rotate(0)}60%{transform:rotate(0);-webkit-transform:rotate(0)}90%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}100%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}}';
	       var chks = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape': 'portrait';

	       if(chks=='landscape'){
	            $('body').append(htm);
	            $('head').append('<style class="style-orient">'+sty+'</style>')
	        }else{
	            $('.orientLayer,.style-orient').hide().remove();
	        }
		}
        
        init();
	    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
	        setTimeout(init, 100);
	    }, false)
	},
	device: function(){   //判断设备类型，PC端打开WAP页面不扫码操作
		var deMsg = this.deviceMsg;
		function init(){
	        var userAgentInfo = navigator.userAgent; 
	        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	        var dev = '<div class="device" id="device"><img src="'+deMsg[0]+'" alt="" class="deImg"><p class="deWrd">'+deMsg[1]+'</p></div>';
	        var sty = '.device { width: 100%; height: 100%; background: rgba(0,0,0,.8); text-align: center; position: absolute; top: 0; left: 0; z-index: 999; }.deImg { padding-top: 160px; }.deWrd { padding-top: 20px; font-size: 24px; color: #fff; }'
	        var flag = true, len = Agents.length; 
	        for (var v = 0; v < len; v++) { 
	            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
	        } 
	        $('.device,.style-device').remove();
	        if(flag){
	            $('body').append(dev);
	            $('head').append('<style class="style-device">'+sty+'</style>')
	        }
		}
		init();
		window.addEventListener('resize', function(){
			init();
		}, false)
	},
	preload: function(file){
		/*(function(){
			var htm = '<div class="loading"><div class="loadIn"><div class="loadRound"><div class="loadTst"></div></div><p class="loadCnt">LOADING</p></div></div>';
			var sty = '.loading { width: 100%; height: 100%; background: rgba(0, 0, 0, 1); position: absolute; top: 0; left: 0; z-index: 999; }.loadIn { width: 140px; height: 140px; padding-top: 10px; position: relative; margin: 280px auto 0; }.loadRound { height: 100px; width: 100px; border: 1px solid #fff; border-radius: 50%; position: absolute; top: 20px; left: 15px; animation: loadingRound 2s infinite; -webkit-animation: loadingRound 2s infinite; }@keyframes loadingRound {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}@-webkit-keyframes loadingRound {0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); }}.loadTst { height: 10px; width: 10px; position: absolute; background-color: #fff; border-radius: 50%; top: 0px; left: 18px; }.loadCnt { position: absolute; top: 60px; left: 30px; font-size: 18px; color: #fff; font-family: calibri; }.loadLogo { width: 100%; position: absolute; top: 200px; font-size: 24px; color: #fff; font-family: Microsoft Yahei; }';
			$('body').prepend(htm);
			$('head').append('<style class="style-load">'+sty+'</style>')
		})();*/
		var baseUrl = location.href.split(file)[0]+file;
		//load
        var loader = new PxLoader();
	    var LoadingImg = [];

	    var loadnum = $('.loadNum');

	    //添加页面的图片
	    $('img').each(function(){
	        if(!$(this).attr('src')) return;
	        LoadingImg.push($(this).attr('src'));
	    });

	    //添加背景的图片
	    $('div').each(function(){
	        if(!$(this).attr('data-src')) return;
	        LoadingImg.push($(this).attr('data-src'));
	    });

	    var imgLength = LoadingImg.length; //获取图片的数量

	    for(var i = 0; i < imgLength; i++){
	        var pxImage = new PxLoaderImage(baseUrl + LoadingImg[i]);
	        pxImage.imageNumber = i + 1;
	        loader.add(pxImage);
	    }

	    //监听加载的过程
	    loader.addProgressListener(function(e){
	        var completedCount = e.completedCount; //完成图片的数量
	        var percent = parseInt(completedCount*100/imgLength); //加载的百分比
	        var cssLeft = parseInt(percent/100); //移动距离
	        loadnum.text(percent +'%');
	    });

	    loader.addCompletionListener(function(){
	        setTimeout(function(){
	           $('.loading').addClass('hide');
	           $('.page').eq(0).removeClass('hide');
	        },500);
	    });

	    loader.start();
	},
	music: function(){    //背景音乐
		var muMsg = this.musicMsg;
        var aud = document.createElement('audio');
            aud.id = 'music';
            aud.className = 'music';
            aud.src = muMsg[0];
            aud.preload = 'auto';
            aud.autoplay = 'autoplay';
            aud.loop = true;
            aud.style.visibility = 'hidden';

        var ico = $('<span class="mIco reverseRotataZ" id="mIco"></span>');
        var sty = '.mIco { position: absolute; top: 10px; right: 10px; width: 54px; height: 54px; display: block; background: url('+muMsg[1]+') no-repeat center; z-index: 1000; }.zanting { background-image: url('+muMsg[2]+'); }.reverseRotataZ { -webkit-animation: reverseRotataZ 1.5s infinite; animation: reverseRotataZ 1.5s infinite; }@-webkit-keyframes reverseRotataZ {0% { -webkit-transform: rotateZ(0deg); }100% { -webkit-transform: rotateZ(-360deg); }}@-webkit-keyframes rotataZ {0% { -webkit-transform: rotateZ(0deg); }100% { -webkit-transform: rotateZ(360deg); }}';
        document.body.appendChild(aud);
        $('body').append(ico);
        $('head').append('<style class="style-music">'+sty+'</style>');
        mEvent();
        

        function mEvent(){
            var music = document.getElementById('music');
            var events = 'ontouchstart' in window?'touchstart':'click';
            music.play();

            //ios兼容处理
            document.addEventListener("WeixinJSBridgeReady", function () {
                music.play();
            }, false);

            //点击播放/暂停
            $('.mIco').on(events, function(){
                if(music.paused){
                    music.play();
                    $(this).removeClass('zanting').addClass('reverseRotataZ');
                }else{
                    music.pause();
                    $(this).removeClass('reverseRotataZ').addClass('zanting');
                }
            })
        }
	},
	slide: function(now,next){　　　　//单页面之间的切换动画
        now.addClass('rotateCarouselTopOut').removeClass('current rotateCarouselTopIn');
        next.addClass('rotateCarouselTopIn current').removeClass('rotateCarouselBottomOut');
    },
    range: function(a, b){　　　　　　　//取ａ、ｂ两个之前的值　　　ａ，ｂ均为数值、不区分正负
    	return parseInt(Math.random()*Math.abs(a-b)+1);
    },
	wxshare: function(tit, cnt, file, page){      //微信分享
		var loc = location.href.split(file)[0]+file;
		
		//分享默认带参数 &from=timeline&isappinstalled=0
	    wx.ready(function(){ 
	        //分享到朋友圈
	        wx.onMenuShareTimeline({
	            title: tit, // 分享标题
	            link: loc+page, // 分享链接
	            imgUrl: loc+'images/share.jpg', // 分享图标
	            success: function () { 
	                // 用户确认分享后执行的回调函数
	                confirm("为您为品加赞！")
	            },
	            cancel: function () { 
	                // 用户取消分享后执行的回调函数
	                confirm("分享不易，确定要抛弃我么T_T")
	            }
	        });
	        
	        //分享到朋友
	        wx.onMenuShareAppMessage({
	            title: tit, // 分享标题
	            desc: cnt, // 分享描述
	            link: loc+page, // 分享链接
	            imgUrl: loc+'images/share.jpg', // 分享图标
	            type: '', // 分享类型,music、video或link，不填默认为link
	            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	            success: function () { 
	                // 用户确认分享后执行的回调函数
	                confirm("为您为品加赞！")
	            },
	            cancel: function () { 
	                // 用户取消分享后执行的回调函数
	                confirm("分享不易，确定要抛弃我么T_T")
	            }
	        });
		})
	},
	stopSlide: function(e){  //阻止页面默认行为
		var e = window.event || e;
		e.stopPropagation();
		e.preventDefault();
	},
	checkMobile: function(s){  //正则匹配手机号
        if(s.length != 11) return false;
        var partten = /^0?1(3|4|5|7|8|9)\d{9}$/;  
        return partten.test(s);  
    }
}



//others
//判断设备
function checkdevice() {
	var ua = navigator.userAgent;
		ua = ua ? ua.toLowerCase().replace(/-/g, "") : "";
	if (ua.match(/(Android)/i)) {
		return "android"
	}
	if (ua.match(/(iPhone|iPod)/i)) {
		return "iphone"
	}
	if (ua.match(/(iPad)/i)) {
		return "ipad"
	}
	if (ua.match(/(U;)/i)) {
		if (ua.match(/(Adr)/i)) {
			return "android"
		}
	}
	if (ua.match(/(U;)/i)) {
		if (ua.match(/(iPh)/i)) {
			return "iphone"
		}
	}
	if (ua.match(/(U;)/i)) {
		if (ua.match(/(iPd)/i)) {
			return "ipad"
		}
	}
};