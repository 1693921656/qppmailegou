/*-------------加载商品分类----------*/
function mainlist(){
	$.ajax({
		url:"../js/goodstype.json",
		success:function(data){
			var msg = data.data;	
			
			for(var i = 0; i < 10;i++){
				var obj = msg[i].data1//奶粉，辅食，营养
				//console.log(obj)	
				var mystr = ''
				for(var j in obj){					
					var str1 = ''
					str1 =  '<h4>'+obj[j].type+'</h4> '
					var str2 = ''
					for(var m in obj[j].con){
						str2 += '<a href="#">'+obj[j].con[m]+'</a>'
					}
					mystr += (str1 + '<span>'+str2 + '</span>')
					
				}					
					
					$('#main .left .goodlist .child').eq(i).append(mystr)
				
			}			
		}			
	})
}
/*---------------------商品列表的开关---------------*/
function switch1(){
	

	var on = true;
	$('#main .left .goodlist p .a2').click(function(){
		if(on){
			$(this).parent().siblings().css('display','block')
			$(this).html('-')
		}else{
			$(this).parent().siblings().css('display','none')
			$(this).html('+')
		}
		on = !on
	})
}
/*--------------推荐--------------*/
function tuijian(){
$.ajax({
	url:"../js/likegoods.json",
	success:function(data){
		var msg = data.data;
		
		for(var j = 0;j < 2;j++){
			var str = ''
			for(var i = 7 * j;i < 7 * j + 7;i++){
				var zhekou = parseInt((msg[i].newprice / msg[i].oldprice)*100) / 100
				str +=
					'<li><a class="in" href="javascript:;">'+
								'<em><img src="'+msg[i].img+'"/></em>'+
								'<span>'+
									'<b>'+msg[i].name+'</b>'+
									'<i>¥'+msg[i].newprice+'('+zhekou+'折)</i>'+								
								'</span>'+
							'</a>'+
							'<strong>'+msg[i].newprice * 100 +'人已购买</strong>'+
					'</li>'
			}
			$('#main .left .comdiv').eq(j).find('ul').append(str)
		}
	}
});
}
/*-----------------------轮播图------------*/
function fn1(){
$.ajax({
	url:"../js/panic_goods.json",
	success:function(data){
		var msg = data.data;
		for(var i = 0;i < 3;i++){
			var str = '';
			for(var j = 4 * i;j <= 4 * i + 3;j++){
				var name = msg[j].name.substring(0,10)
				
				str +=
					'<dl>'+
						'<dt><a class="in" href="javascript:;"><img src="'+msg[j].img+'"/></a></dt>'+
						'<dd>'+
							'<a class="name in" href="javascript:;">'+name+'</a>'+
							'<em>¥'+msg[j].newprice+'</em>'+
							'<i>¥'+msg[j].oldprice+'</i>'+
							'<a class="btn in" href="javascript:;">立即抢购</a>'+
						'</dd>'+
					'</dl>'
			}
			$('#main .right .lunbo .box .com').eq(i).append(str)
		}
	}
});
lunbochange($('#main .right .lunbo .prev'),$('#main .right .lunbo .next'),$('#main .right .lunbo .sum'),2500,500,910,$('#main .right .lunbo'),2,'.com')
}
/*--------------------品牌------------------------*/
function pinpai(){
var on = true
$('#main .m_right .pin .btnon').click(function(){
	if(on){
		$('#main .m_right .pin b').css('display','block')
		$(this).html('收缩品牌')
		$(this).css('background','#fff url(../img/l_2.png) no-repeat 85px 5px')
	}else{
		$(this).html('更多品牌')
		$('#main .m_right .pin b').css('display','none')
		$(this).css('background','#fff url(../img/l_1.png) no-repeat 85px 5px')
	}
	on = !on
})
}
/*------------------------请求ajax---------------*/
function listajax(){
	$.ajax({
	url:"../js/goodslist.json",
	success:function(data){
		var msg = data.data;
		
		for(var j = 0;j < 4;j++){
			var str = ''
			
			for(var i = 36*j;i < 36*j+36;i++){
				str+=	'<dl>'+
						'<dt><a index="'+msg[i].id+'"  class="in" href="javascript:;"><img src="'+msg[i].img+'" alt="'+msg[i].name+'" title="'+msg[i].name+'"/></a></dt>'+
						'<dd class="dd1"><a index="'+msg[i].id+'"  class="in" href="javascript:;">'+msg[i].name+'</a></dd>'+
						'<dd class="dd2"><i>¥<b>'+msg[i].newprice+'</b></i><em>¥'+msg[i].oldprice+'</em></dd>'+
						'<dd class="dd3"><b>销量<em>'+msg[i].oldprice* 10*i+'</em></b><b>评价<em>'+msg[i].newprice*(i)+'</em></b></dd>'+
						'<dd class="dd4"><a class="join" href="javascript:;">加入购物车</a><a class="collect" href="javascript:;">收藏</a></dd>'+
					'</dl>'
				}
				$('#content div').eq(j).append(str)
			}
		}
	});
}
/*--------------筛选-----------------*/

function shaixuan(){
	$('#main .m_right .shaixuan .xiaoliang').click(function(){
	var arrb = [];//放标签	
	$('#main #content div').eq(0).find('dl').each(function(){
		arrb.push($(this))		
	})
	for(var i = 1;i < arrb.length;i++){
		for(var j = arrb.length-1;j >=i;j--){
			if(parseInt(arrb[j].find('dd:nth-child(4) b:first em').html()) > parseInt(arrb[j-1].find('dd:nth-child(4) b:first em').html())){
				var t = arrb[j];
				arrb[j] = arrb[j-1];
				arrb[j-1] = t;
			}
		}	
	}
	$('#content div').eq(0).html(arrb)
})

$('#main .m_right .shaixuan .jiage').click(function(){
	var arrb = [];//放标签	
	$('#main #content div').eq(0).find('dl').each(function(){
		arrb.push($(this))		
	})
	for(var i = 1;i < arrb.length;i++){
		for(var j = arrb.length-1;j >=i;j--){
			if(parseInt(arrb[j].find('dd:nth-child(3) i b').html()) > parseInt(arrb[j-1].find('dd:nth-child(3) i b').html())){
				var t = arrb[j];
				arrb[j] = arrb[j-1];
				arrb[j-1] = t;
			}
		}	
	}
	$('#content div').eq(0).html(arrb)
})

$('#main .m_right .shaixuan .ping').click(function(){
	var arrb = [];//放标签	
	$('#main #content div').eq(0).find('dl').each(function(){
		arrb.push($(this))		
	})
	for(var i = 1;i < arrb.length;i++){
		for(var j = arrb.length-1;j >=i;j--){
			if(parseInt(arrb[j].find('dd:nth-child(4) b:last em').html()) > parseInt(arrb[j-1].find('dd:nth-child(4) b:last em').html())){
				var t = arrb[j];
				arrb[j] = arrb[j-1];
				arrb[j-1] = t;
			}
		}	
	}
	$('#content div').eq(0).html(arrb)
})

$('#main .m_right .shaixuan .timea').click(function(){
	var arrb = [];//放标签	
	$('#main #content div').eq(0).find('dl').each(function(){
		arrb.push($(this))		
	})
	for(var i = 1;i < arrb.length;i++){
		for(var j = arrb.length-1;j >=i;j--){
			if(parseInt(arrb[j].find('dd:nth-child(4) b:first em').html()) > parseInt(arrb[j-1].find('dd:nth-child(4) b:first em').html())){
				var t = arrb[j];
				arrb[j] = arrb[j-1];
				arrb[j-1] = t;
			}
		}	
	}
	$('#content div').eq(0).html(arrb)
})


$('#main .m_right .shaixuan .btn').click(function(){
	var arrb = [];//放标签	
	var num1 = parseInt($('#main .shaixuan .inp1').val())
	var num2 = parseInt($('#main .shaixuan .inp2').val())
	$('#main #content div').eq(0).find('dl').each(function(){
		arrb.push($(this))		
	})
	var arr1 = []//存放筛选后的标签
	for(var i = 1;i < arrb.length;i++){
		var myprice = parseInt(arrb[i].find('dd:nth-child(3) i b').html());
			if(myprice >= num1 &&  myprice <= num2){
				arr1.push(arrb[i])
			}
	
	}
	$('#content div').eq(0).html(arr1)
})
}