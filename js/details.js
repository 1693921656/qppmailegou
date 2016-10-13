function goodajax(){
	var dataId =  getCookie('dataId')
	$.ajax({
		url:"../js/goodslist.json",
		success:function(data){
			var msg = data.data;
			var str = ''
			for(var i in msg){
				if(dataId == msg[i].id){
					str+=
					'<p class="ptitle"><a href="index.html">首页</a><i>&gt;</i><a href="goodslist.html">奶粉专场</a><i>&gt;</i><b>'+msg[i].name+'</b></p>'+
			'<div class="main">'+
				'<div class="m_left left">'+
					'<div class="small" id="small">'+
						'<img src="'+msg[i].img+'"/>'+
						'<div class="fang" id="fang"></div>'+
					'</div>'+
					'<div class="tab">'+
						'<div>'+
							'<img src="'+msg[i].img+'"/>'+
							'<img src="'+msg[i].img1+'"/>'+
							'<img src="'+msg[i].img2+'"/>'+
							'<img src="'+msg[i].img3+'"/>'+
							'<img src="'+msg[i].img4+'"/>'+
						'</div>'+
						'<span class="prev">&lt;</span>'+
						'<span class="next">&gt;</span>'+
					'</div>'+
					'<div id="big" class="big"><img id="bigimg" src="'+msg[i].img+'"/></div>'+
					'<p class="p1"><a href="#">收藏商品：（11人气）</a></p>'+
					'<p class="p2 call"><a class="a1" href="#">服务热线：400-666-6600</a><a class="a2" href="#">在线客服</a></p>'+
				'</div>'+
				'<div class="m_right right">'+
					'<h3><i>全球购</i>'+msg[i].name+'</h3>'+
					'<p class="p1">'+msg[i].detail+'</p>'+
					'<P class="p2">麦乐购价：<em>¥'+msg[i].newprice+'</em><b>含税价</b><i>（包含关税、进口增值税和消费税）</i></P>'+
					'<p class="p3">市 场 价：$'+0.15*msg[i].oldprice+'(¥'+msg[i].oldprice+')</p>'+
					'<p class="p4">促销信息:<span class="log"><b>N元任选</b>329元任选3件</span></p>'+
					'<p class="p5">累计销量:<i>'+msg[i].oldprice*10*i+'</i> | 累计评价：<i>'+msg[i].newprice*i+'</i> | 赠送麦豆：<i>'+parseInt(msg[i].newprice / 10)+'</i></p>'+
					'<p class="p51">属&nbsp;&nbsp;性：规格：瓶</p>'+
					'<p class="p6">组合套餐:<a price="'+msg[i].newprice+'" class="one" href="javascript:;">1件</a><a class="two" price="'+msg[i].newprice+'" href="javascript:;">2件</a></p>'+
					'<p class="p7"><i>购买数量:</i><a class="jian" href="javascript:;">-</a><input class="inp" type="text" value="1" /><a class="jia" href="javascript:;">+</a></p>'+
					'<input goodid="'+msg[i].id+'" class="join" type="button" value="加入购物车" /><br />'+
					'<p class="p8">温馨提示： 此商品物权归麦乐购(香港)有限公司所有 </p>'+
				'</div>'+
			'</div>'
					
				}
			}
			$('#main').html(str)
		}
	});
}
/*------------1件两件的价格变动-------------*/
function dogood(){
	$('#main').on('click','.m_right .two',function(){//2件75折
	var price = $(this).attr('price')
	$(this).parents('.m_right').find('.p2 em').html('¥'+price*1.5)
	})
	$('#main').on('click','.m_right .one',function(){//1件原价
		var price = $(this).attr('price')
		$(this).parents('.m_right').find('.p2 em').html('¥'+price)
	})
	/*----------数量减---------------*/
	$('#main').on('click','.m_right .jian',function(){
		var count = parseInt($(this).parent().find('input').val());
		count--;
		if(count < 1){
			count = 1;
			$(this).attr('contenteditable','false')
		}
		$(this).parent().find('input').val(count)
	})
	/*-----------数量加-------------------*/
	$('#main').on('click','.m_right .jia',function(){
		var count = parseInt($(this).parent().find('input').val());
		count++;
		$(this).parent().find('input').val(count)
	})
	/*-------------购物车跳转---------------------*/

	

	$('#main').on('click','.m_right .join',function(){
		var dataId = $(this).attr('goodid');
		setCookie(dataId,dataId)
		var count = Number($(this).parent().find('.inp').val());
			if(getCookie(dataId)){
				var oldCount = Number(getCookie('dataId' + dataId))
				var newCount = oldCount + count;
				setCookie('dataId'+dataId,newCount);
			}else{
				setCookie('dataId'+dataId,count);
			}
			
			window.location.href = 'cart.html'
	})
}

/*-----------------放大镜-------------------*/
function fdj(){
	$('#main').on('mouseover','.m_left .tab img',function(){
		var img1 = $(this).attr('src');
		$(this).parents('.m_left').find('.small img').attr('src',img1)
		$(this).css({'width':'54px','height':'53px','border':'2px solid #ff6600'})
	})
	$('#main').on('mouseout','.m_left .tab img',function(){
		$(this).css({'width':'55px','height':'54px','border':'1px solid #ccc'})
	})
	$('#main').on('click','.m_left .tab img',function(){
		var img1 = $(this).attr('src');
		$(this).parents('.m_left').find('.small img').attr('src',img1)
		$(this).css({'width':'54px','height':'53px','border':'2px solid #ff6600'})
	})
	var arrImg = ["../img/i_cai1.jpg","../img/c11.jpg","../img/c12.jpg","../img/c13.jpg","../img/c14.jpg"]
	$('#main').on('click','.m_left .tab  .next',function(){
		var index = 0
		var img1 = $(this).parents('.m_left').find('.small img').attr('src');
		for(var i = 0;i < arrImg.length;i++){
			if(img1 == arrImg[i]){
				$(this).parents('.m_left').find('.small img').attr('src',arrImg[(i+1)%5])
				index = (i+1)%5
			}		
		}		
		$(this).parent().find('div img').eq(index).css({'width':'54px','height':'53px','border':'2px solid #ff6600'}).siblings().css({'width':'55px','height':'54px','border':'1px solid #ccc'})
	})
	$('#main').on('click','.m_left .tab  .prev',function(){
		var index = 0
		var img1 = $(this).parents('.m_left').find('.small img').attr('src');
		for(var i = 0;i < arrImg.length;i++){
			if(img1 == arrImg[i]){
				if(i == 0){
					$(this).parents('.m_left').find('.small img').attr('src',arrImg[4])
					index = 4
				}else{
					$(this).parents('.m_left').find('.small img').attr('src',arrImg[i-1])
					index = (i-1)
				}			
			}		
		}		
		$(this).parent().find('div img').eq(index).css({'width':'54px','height':'53px','border':'2px solid #ff6600'}).siblings().css({'width':'55px','height':'54px','border':'1px solid #ccc'})
	})
	$('#main').on('mouseover','.m_left .small',function(){
		$(this).find('.fang').css('display','block');
		var img = $(this).find('img').attr('src')
		$(this).parent().find('.big img').attr('src',img)
		$(this).parent().find('.big').css('display','block')	
	})
	$('#main').on('mouseout','.m_left .small',function(){
		$(this).find('.fang').css('display','none');
		$(this).parent().find('.big').css('display','none')
	})
	$('#main').on('mousemove','.m_left .small',function(evt){
		var e = evt || window.event;
		var l = e.pageX - $(this).offset().left - 85;
		var t = e.pageY - $(this).offset().top - 85;
		if(l < 0){
			l = 0;
		}else if(l > 180){
			l = 180;
		}
		if(t < 0){
			t = 0;
		}else if( t > 180){
			t = 180;
		}
		$(this).find('.fang').css({'left':l + 'px','top':t+'px'})
		$(this).parent().find('.big img').css({'left':-1*l+'px','top':-1*t+'px'})				
	})
}