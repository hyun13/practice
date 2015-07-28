// banner size
var BANNER_WIDTH = 980;
var SHOW_DURATION = 500; 
var AUTO_PLAY_TIME = 2000;

var $banner_content;

var nBannerLength = 0;
var nCurrentBannerIndex = 0;

var $banner_dots;

// auto timer id
var autoTImerID;

$(document).ready(function(){
	initMenu();
	initEventListener();
	
	startAutoPlay();
});

function initMenu(){
	$banner_content = $("#banner_content");
	nBannerLength = $banner_content.children("img").length;
	//banner width = per banner * bannerlength
	$banner_content.width(BANNER_WIDTH * nBannerLength);
	
	
	//banner menu lacation
	$banner_dots = $("#banner_nav li a");
	//initialization
	showBannerDotAt(0);

	autoTImerID = 0;
}
//event
function initEventListener(){
	//prev banner
	$("#btn_prev_banner").bind("click", function(){
		prevBanner();
	});
	//next banner
	$("#btn_next_banner").bind("click", function(){
		nextBanner();
	});
	
	//moseover_location
	$banner_dots.bind("mouseenter",function(){
		var nIndex = $banner_dots.index(this);
		showBannerAt(nIndex);
	});
	
	var $banner_slider = $("div.banner_slider");
	//mouseover_auto slider stop
	$banner_slider.bind("mouseenter",function(){
		stopAutoPlay();	
	});
	//auto slider start
	$banner_slider.bind("mouseleave",function(){
		startAutoPlay();	
	});
}
	

//prev banner
function prevBanner(){
	//banner index value
	var nIndex = this.nCurrentBannerIndex-1;
	//dont have prev banner _ last index
	if(nIndex<0)
		nIndex = this.nBannerLength-1;
		
	//show banner
	this.showBannerAt(nIndex);			
}

//next banner
function nextBanner()
{
	//banner index
	var nIndex = this.nCurrentBannerIndex+1;
	//dont have next banner _ first index
	if(nIndex>=nBannerLength)
		nIndex = 0;

	this.showBannerAt(nIndex);	
}

// nIndex banner
function showBannerAt(nIndex){
	if (nIndex != this.nCurrentBannerIndex) {
		//  n banner value
		var nPosition = -BANNER_WIDTH * nIndex;
		
		// update n banner value
		this.showBannerDotAt(nIndex);
		
		//start slide
		$banner_content.stop();
		$banner_content.animate({
			left: nPosition
		}, SHOW_DURATION, "easeOutQuint");
		// update
		this.nCurrentBannerIndex = nIndex;
	}
}


// 배너 메뉴의 위치값을 업데이트 시킴.
function showBannerDotAt(nIndex){
	this.$banner_dots.eq(this.nCurrentBannerIndex).removeClass("select");
	this.$banner_dots.eq(nIndex).addClass("select");
}




////////////////////////////////////////////////////////
// 자동 실행 시작
function startAutoPlay(){
	
	if(this.autoTimerID!=0)
		clearInterval(this.autoTimerID);
		
	this.autoTimerID = setInterval(function(){
		nextBanner();
	},this.AUTO_PLAY_TIME);
}

// 자동실행 멈춤.
function stopAutoPlay(){
	if(this.autoTimerID!=0)
		clearInterval(this.autoTimerID);
		
	this.autoTimerID = 0;
}


