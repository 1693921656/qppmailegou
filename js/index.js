/*--------------------轮播图---------------------*/
function lunbo() {
	var index = 0;
	var bgArr = ['#dd2758', '#d8effd', '#f7cdfb', '#f9c8a0', '#f4adef']
	var timer = null;
	timer = setInterval(changeImg, 3000)
	$('#banner .ban .small li').hover(function() {
		clearInterval(timer);
		$(this).animate({
			'bottom': '20px'
		})
		$(this).siblings().animate({
			'bottom': '12px'
		})
	}, function() {
		timer = setInterval(changeImg, 3000)
		$(this).animate({
			'bottom': '12px'
		})
	})

	function changeImg() {
		index++;
		if (index > 4) {
			index = 0;
		}
		$('#banner .ban .big li').eq(index).fadeIn().siblings().fadeOut()
		$('#banner .ban .big li').eq(index).find('img').animate({
			'height': '480px',
			'width': '810px'
		}, 2500)
		$('#banner .ban .big li').eq(index).siblings().find('img').animate({
			'height': '500px',
			'width': '830px'
		}, 2500)
		$('#banner .ban .big').css('background', bgArr[index])
		$('#banner .ban .small li').eq(index).animate({
			'bottom': '20px'
		})
		$('#banner .ban .small li').eq(index).siblings().animate({
			'bottom': '12px'
		})
	}

}
/*---------倒计时函数，距离9月4号中午12点-----------------*/
function changeTime(){
		var myday = new Date(2016,8,4,12);
		setInterval(function(){
		var arr = daojishi(myday);
	$('.panic .panic_top img:not(".img1")').each(function(){
		var num = $(this).index();
		$(this).attr('src','../img/time'+arr[num]+'.png')
	})
},1000)
		var index = 9;
	setInterval(function(){
		index--;
		if(index < 0){
			index = 9;
		}
		$('.panic .panic_top img:last').attr('src','../img/stime'+index+'.png')
	},100)
	}
/*--------------------抢购导航的效果-----------------------*/
function panic_menu() {
	var arr = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"]
	var now = new Date();
	var nowH = now.getHours();
	$('.panic .panic_bot .menu li').each(function() {
		var index = $(this).index()
		if(nowH < 8){
			$(this).find('b').html(arr[(index + 8) % 9])
		}else if(nowH < 10){
			$(this).find('b').html(arr[(index) % 9])
		}else if(nowH < 12){
			$(this).find('b').html(arr[(index + 1) % 9])
		}else if(nowH < 14){
			$(this).find('b').html(arr[(index + 2) % 9])
		}else if(nowH < 16){
			$(this).find('b').html(arr[(index + 3) % 9])
		}else if(nowH < 18){
			$(this).find('b').html(arr[(index + 4) % 9])
		}else if(nowH < 20){
			$(this).find('b').html(arr[(index + 5) % 9])
		}else if(nowH < 22){
			$(this).find('b').html(arr[(index + 6) % 9])
		}else if(nowH < 24){
			$(this).find('b').html(arr[(index + 7) % 9])
		}
	})
	$('.panic .panic_bot .menu').on('click','li',function() {
		
		$(this).find('p').css('display', 'block')
		$(".menu li").addClass("colorhui")
		$(this).removeClass("colorhui").addClass("colorred")
		$(this).siblings().removeClass("colorred")
		$(this).siblings().find('p').css('display', 'none')
		var index =  $(this).index()
		$(this).parents('.panic_bot').find('.con .box').eq(index).addClass('box1').siblings().removeClass('box1')
		
		fenye(3,$('.panic_bot .next,.panic_bot .anext'),$('.panic_bot .prev,.panic_bot .aprev'),$('.panic_bot .con .box').eq($(this).index()),1200,$('.panic_bot .btn b'))			
	})
}
/*---------------------加载抢购商品--------------------*/
function panicGoods(){
$.ajax({
	url:"../js/panic_goods.json",
	success:function(data){
		var msg = data.data;
for(var j = 0; j < 9;j++){
		var str = '';
	for(var i = 12*j;i <= 12*j+11;i++){
		str += 
						'<dl>'+
							'<dt><a href="#"><img src="'+msg[i].img+'"/></a></dt>'+
							'<dd class="dd1"><a href="#">'+ msg[i].name+'</a></dd>'+
							'<dd class="dd2"><b>'+msg[i].zhekou+'</b><span><i>¥'+ msg[i].newprice+'</i><em>¥'+msg[i].oldprice+'</em></span><a href="#">马上抢</a></dd>'+
						'</dl>'
						
	}
	$('.panic_bot .con').find('.box').eq(j).append(str)
}
	}
});
}
/*------------------------加载半价商品------------------*/
function halfGoods(){
$.ajax({
	url:"../js/half_goods.json",
	success:function(data){
		var msg = data.data;
		var str = '';
		for(var i in msg){
			str += 
				'<dl>'+
					'<dt><a href="#"><img src="'+msg[i].img+'"/></a></dt>'+
					'<dd>'+
						'<a href="#">'+
							'<i class="i1">'+msg[i].name+'</i>'+
							'<p class="p1"><span>¥'+msg[i].newprice+'</span><b>¥'+msg[i].oldprice+'</b></p>'+
							'<p class="p2"><em>已售'+msg[i].sellcount+'件</em><i>马上抢</i></p>'	+
						'</a>'+
					'</dd>'+
				'</dl>'
		}
		$('.half .half_con').append(str)
	}
});
}
/*----------------特价商品的图片变大效果----------*/
function te(){
$('.te .te_con').on('mouseover','dt',function(){
	$(this).find('img').stop().animate({'height':'250px','left':'-10px','width':'310px'},2000)
	$(this).parents('dl').siblings().find('img').stop().animate({'height':'230px','left':'0','width':'290px'},2000)
})
$('.te .te_con').on('mouseout','dt',function(){
	$(this).find('img').stop().animate({'height':'230px','left':'0','width':'290px'},2000)
})
}
/*------------加载特价商品--------------*/
function  teAjax(){
$.ajax({//问题：计时器太快，只能获取到最后一个商品的失效日期,定时器重复，会覆盖之前
	url:"../js/te_goods.json",
	success:function(data){
		var msg = data.data;//商品对象
		var str = '';
		for(var i in msg){//遍历
			
			var arr1 = msg[i].selldate.split('-')//商品失效日期用-分隔成数组
			var goodsdate = new Date(Number(arr1[0]),Number(arr1[1]),Number(arr1[2]))//获取到每个商品失效日期
			//console.log(goodsdate)
			 str +=
			 	'<dl index="'+msg[i].id+'">'+
					'<dt><a href="#"><img src="'+msg[i].img+'"/></a></dt>'+
					'<dd class="dd1"><p class="p1">'+msg[i].name+'</p><p class="p2" data-end-time="'+msg[i].selldate+'" data-start-time="2016/8/23 11:51:00"></p></dd>'+
					'<dd class="dd2">'+msg[i].zhekou+'<i>折起</i></dd>'+
				'</dl>'	
		}
		$('.te .te_con').append(str)	
		
		var countTime = function () {
				    var eles = $('.te .p2'),
				        len = eles.length;
				    for (; len > 0; len--) {
				        var ele = eles.eq(len - 1);
				        (function (ele) {
				            startTime = new Date(ele.attr('data-start-time')).getTime(),
				                    endTime = new Date(ele.attr('data-end-time')).getTime(),
				                    alarm = new Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
				                        ele.text('剩余'+day+'天'+hour + '小时' + minute + '分' + second+'秒');
				                    }, function () { //倒计时结束
				                        ele.text('00:00:00');
				                    });
				            alarm.start();
				        })(ele);
				    }
				};
				countTime();
	}
});
}
/*--------------加载猜你喜欢商品-------------*/
function likeAjax(){
$.ajax({
	url:"../js/likegoods.json",
	success:function(data){
		var msg = data.data;
		//console.log(msg.length)
		var str = '';
		for(var i in msg){
			str +=
				'<dl>'+
					'<a href="#">'+
					'<dt><img src="'+msg[i].img+'"/></dt>'+
					'<dd>'+msg[i].name+'</dd>'+
					'<dd><b>¥'+msg[i].newprice+'</b><i>¥'+msg[i].oldprice+'</i></dd>'+
					'</a>'+
				'</dl>'
		}
		$('.like .like_con').append(str)
	}
});
}
/*--------------楼梯------------------*/
function louti() {
	var imgArr = ['../img/f1.png', '../img/f2.png', '../img/f3.png', '../img/f4.png', '../img/f5.png', '../img/f6.png', '../img/f7.png', '../img/f8.png', '../img/f9.png']
	$(window).scroll(function() {
		var sc = $(this).scrollTop();
		if (sc > 3400 && sc < 7837) {
			$('.louti_list').css('display', 'block')
			for (var i = 0; i < 9; i++) {
				if (sc > 3400 + 493 * (i) && sc < 3400 + 493 * (i + 1)) {
					$('.louti_list li').eq(i).find('a').html($('.louti').eq(i).find('h2').html())
					$('.louti_list li').eq(i).css('borderBottom', '1px solid #e8a79c')
				} else {
					$('.louti_list li').eq(i).find('a').html('<img src="' + imgArr[i] + '"/>')
					$('.louti_list li').eq(i).css('borderBottom', '1px solid #ccc')
				}

			}
		} else {
			$('.louti_list').css('display', 'none')
		}
	})
	$('.louti_list li').hover(function() {
		$(this).find('a').html($('.louti').eq($(this).index()).find('h2').html()).css({
			'color': '#e8a79c'
		})
	}, function() {
		$(this).css({
			'background': '#fff',
			'color': 'red'
		})
		$(this).find('a').html('<img src="' + imgArr[$(this).index()] + '"/>')
	})
}
/*------------给楼梯循环加背景和样式--------*/
function bglouti() {
	var bgArr = ['#03a4fe', '#fb5d5c', '#32b16a', '#50d4d9', '#f362b3', '#7863de', '#fc9b61', '#a4cc4e', '#c173d8'];
	var spanArr = ['#5cc3ff', '#ff9f9f', '#6acf98', '#8be9e9', '#fc9dd1', '#aa9bfc', '#ffc7a7', '#c0da8c', '#e4a2fc'];
	var borderArr = ['#c9ebff', '#ffd0d0', '#badecb', '#cef0f0', '#fcd6eb', '#d9d4f3', '#ffe2d1', '#e1eccc', '#f1ccff'];

	$('.louti').each(function() {
		var index = $(this).index()
		$(this).find('h2').css({
			'background': bgArr[index],
			'borderBottom': '4px solid ' + borderArr[index]
		})
		$(this).find('.left span').html((index + 1) + 'F').css('background', spanArr[index])

	})
}
/*-------------楼梯的ajax请求----------------*/
function loutiAjax(){
$.ajax({
	url:"../js/nav_list.json",
	success:function(data){
		var msg = data.data;
		for(var j = 0;j < 9;j++){
			var str = '';	
			for(var i in msg[j].appropriate){
				str+=
				'<a href="#">'+msg[j].appropriate[i]+'</a>'
			}
			$('.louti').eq(j).find('.left p').append(str)
		}		
	}
});
$.ajax({
	url:"../js/index_loutilunbo.json",
	success:function(data){
		var msg = data.data;
		
		for(var i = 0;i < 9;i++){
			var str = '';
			str +=
					'<ul>'+
						'<li><a href="#"><img src="'+msg[i].img1+'"/><img src="'+msg[i].img2+'"/><img src="'+msg[i].img3+'"/><img src="'+msg[i].img4+'"/></a></li>'+
						'<li><a href="#"><img src="'+msg[i].img5+'"/><img src="'+msg[i].img6+'"/><img src="'+msg[i].img7+'"/><img src="'+msg[i].img8+'"/></a></li>'+
					'</ul>'+
					'<a class="prev a1" href="javascript:;">&lt;</a>'+
					'<a class="next a1" href="javascript:;">&gt;</a>'
					$('.louti').eq(i).find('.lunbo').append(str)
		}
	}
});
$.ajax({
	url:"../js/louti_content.json",
	success:function(data){
		var msg = data.data;
		for(var i = 0;i < 9;i++){
			var str = '' 
			str +=
				'<a href="#"><img src="'+msg[i].a+'"/><img src="'+msg[i].b+'"/></a>'+
				'<a href="#" class="center"><img src="'+msg[i].c+'"/><img src="'+msg[i].d+'"/></a>'+
				'<a href="#"><img src="'+msg[i].e+'"/><img src="'+msg[i].f+'"/><img src="'+msg[i].g+'"/></a>'
				$('.louti').eq(i).find('.right').append(str)
		}
	}
});
}
/*--------------楼梯的轮播-----------------*/
function loutiLunbo(){
$('.louti .lunbo').on('click','.next',function(){
	$(this).parent().find('ul').stop().animate({'left':'-180px'},1000,function(){
		$(this).parent().find('ul').css('left',0)
		$(this).parent().find('ul li').eq(0).appendTo($(this).parent().find('ul'))
	})
})
$('.louti .lunbo').on('click','.prev',function(){
	$(this).parent().find('ul').stop().animate({'left':'0'},1000,function(){
		$(this).parent().find('ul').css('left','-180px')
		$(this).parent().find('ul li').eq(0).appendTo($(this).parent().find('ul'))
	})
})
var timer = setInterval(function(){
	$('.louti .lunbo .next').click()
},2000)
$('.louti .lunbo').hover(function(){
	clearInterval(timer)
},function(){
	timer = setInterval(function(){
	$('louti .lunbo .next').click()
},2000)
})
}

/*-------------------nag------------------*/
function nag(){
var bgArr = [1,2,3,4,5,6]
$('.navigation p').each(function(){
	var i = $(this).index()
	$(this).css('background','url(../img/nag'+bgArr[i]+'.png) no-repeat center 0')
})
$.ajax({
	url:"../js/nav_list.json",
	success:function(data){
		var msg = data.data;
		var aArr = ["宝宝用品","宝宝服饰","宝宝玩具"]
		for(var j = 2;j < 5;j++){
			var strm = ''
			for(var m in msg[j+1].appropriate){
				strm += '<a class="a2" href="#">'+msg[j+1].appropriate[m]+'</a>'
			}
			$('.navigation p').eq(j).append('<span>'+strm+'</span>'+'<a class="a1" href="#">'+aArr[j-2]+'<b></b></a>')
		}
		var str = '';
		for(var i in msg[0].benefit){
			str += '<a class="a2" href="#">'+msg[0].benefit[i]+'</a>'
		}
		$('.navigation p').eq(0).append('<span>'+str+'</span>'+'<a class="a1" href="#">宝宝奶粉<b></b></a>')
		
		var str1 = ''
		for(var i in msg[1].type){
			str1 += '<a class="a2" href="#">'+msg[1].type[i]+'</a>'
		}
		$('.navigation p').eq(1).append('<span>'+str1+'</span>'+'<a class="a1" href="#">营养健康<b></b></a>')
		var str2 = ''
		for(var i in msg[7].appropriate){
			str2 += '<a  class="a2" href="#">'+msg[7].appropriate[i]+'</a>'
		}
		$('.navigation p').eq(5).append('<span>'+str2+'</span>'+'<a class="a1" href="#">个护化妆<b></b></a>')
	}
});
}
/*---------------达人----------------------*/
function daren(){
	

$.ajax({
	url:"../js/index_daren.json",
	success:function(data){
		var msg = data.data;
		var str = '';
		for(var i in msg){
			str +='<dl>'+
						'<a href="#">'+
							'<dt><img src="'+msg[i].img+'"/></dt>'+
							'<dd class="dd1">'+msg[i].name+'</dd>'+
							'<dd class="dd2">'+msg[i].detail+'</dd>'+
						'</a>'+
					'</dl>'
		}
		$('.daren .left div').append(str)
	}
});
$.ajax({
	url:"../js/index_daren1.json",
	success:function(data){
		var msg = data.data;
		for(var i = 0;i < 2;i++){
			var str = ''
			for(var j = 4 * i;j <= 4 * i + 3;j++){
				str += '<dl>'+							
							'<dt><a href="#"><img src="'+msg[j].img+'"/><b>'+msg[j].name+'</b><i></i></a></dt>'+
							'<dd class="dd1"><b>V'+msg[j].userNum+'</b><i>'+msg[j].userType+'</i></dd>'+
							'<dd class="dd2"><a href="#">'+msg[j].ping+'</a></dd>'	+						
						'</dl>'
						
			
			}
			$('.daren .right .lun div').eq(i).append(str)
		}
	}
});
$('.daren .anext').click(function(){	
	$(this).parents('.right').find('.lun1').stop().animate({'left':'-230px'},2000,function(){
		$(this).parents('.right').find('.lun1 dl').eq(0).appendTo($(this).parents('.right').find('.lun1'));
		$(this).parents('.right').find('.lun1').css('left','0px')
	})	
	$(this).parents('.right').find('.lun2').stop().animate({'left':'-230px'},2000,function(){
		$(this).parents('.right').find('.lun2 dl').eq(0).appendTo($(this).parents('.right').find('.lun2'));
		$(this).parents('.right').find('.lun2').css('left','0px')
	})	
})
$('.daren .aprev').click(function(){	
	$(this).parents('.right').find('.lun1').stop().animate({'left':'0'},2000,function(){
		$(this).parents('.right').find('.lun1 dl').eq(3).prependTo($(this).parents('.right').find('.lun1'));
		$(this).parents('.right').find('.lun1').css('left','-230px')
	})	
	$(this).parents('.right').find('.lun2').stop().animate({'left':'0'},2000,function(){
		$(this).parents('.right').find('.lun2 dl').eq(3).prependTo($(this).parents('.right').find('.lun2'));
		$(this).parents('.right').find('.lun2').css('left','-230px')
	})	
})
var timer = null;
timer = setInterval(function(){
	$('.daren .anext').click()
},2500)
$('.daren .right').hover(function(){
	clearInterval(timer)
},function(){
	timer = setInterval(function(){
	$('.daren .anext').click()
},2500)
})
}