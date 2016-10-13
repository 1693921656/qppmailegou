/*----------------------header----------------------------*/
function headFn() {
	$('#header .head_top .l1').hover(function() { //二级菜单
		$(this).find('ul').stop().slideDown()
		$(this).css({
			'background': '#fff',
			'border': '1px solid #ccc',
			'borderBottom': 0
		})
		$(this).find('.a1').css({
			'background': 'url(../img/h_l7.png) no-repeat right 5px'
		})

		$(this).find('ul').css({
			'background': '#fff',
			'border': '1px solid #ccc',
			'borderTop': 0
		})
	}, function() {
		$(this).find('ul').stop().slideUp()
		$(this).css({
			'background': '#f5f5f5',
			'border': '1px solid #f5f5f5'
		})
		$(this).find('.a1').css({
			'background': 'url(../img/h_l6.png) no-repeat right 5px'
		})
	})
	$('#header .head_top .l3').hover(function() {//二维码效果
		$(this).find('div').stop().slideDown()
		$(this).css({
			'background': '#fff',
			'borderTop': '1px solid #ccc',
			'borderLeft': '1px solid #ccc'
		})
	}, function() {
		$(this).find('div').stop().slideUp()
		$(this).css({
			'background': '#f5f5f5',
			'borderTop': '1px solid #f5f5f5',
			'borderLeft': '1px solid #f5f5f5'
		})
	})
	$('#header .head_bot .inp').hover(function() {//搜索框
		$(this).css('border', '2px solid #666')
	}, function() {
		$(this).css('border', '2px solid #cb1e00')
	})
	$('#header .head_bot .inp').focus(function() {
		$(this).val('')
	})
	$('#header .head_bot .inp').blur(function() {
		var str = $(this).val() //用户体验好，可保存用户输入的内容
		if (str == '') {
			$(this).val('11周年庆，最高满199减100再返200')
		} else {
			$(this).val(str)
		}
	})

	if (getCookie('success') == 'true') { //用户登录状态切换
		var user = getCookie('user');
		var str = user.substring(0, 3)
		var str1 = user.substring(7, 11)
		var myStr = str + '****' + str1
		$('#header .head_top .left .s1').html('<a href="#">麦乐购首页</a>' + myStr + '<a class="exit" href="#">退出</a>')
		$('#header .head_top .left .s2').css({
			'display': 'none'
		})
	} else {
		$('#header .head_top .left .s1').html(
			'<a href="#">麦乐购首页</a>' +
			'<a class="login" href="login.html">请登录</a>' +
			'<a class="reg" href="register.html">免费注册</a>')
	}
	$('#header .head_top .left .s1 .exit').click(function() {
		$(this).parent().next().css({
			'display': 'inline'
		})
		setCookie('success', false)
		$(this).parents('body').find('#r_list').animate({'right':'-280px'})
		
		$(this).parent().html(
			'<a href="#">麦乐购首页</a>' +
			'<a class="login" href="login.html">请登录</a>' +
			'<a class="reg" href="register.html">免费注册</a>')

	})
}//函数完
/*--------------------------导航nav----------------------*/
function navFn() {//导航栏效果
	$('#nav .left li').mouseover(function() {
		var length = parseInt($(this).css('width'))//获取当前li宽度
		var length1 = $(this).position().left
		$('#nav .border').stop().animate({
			'left': length1,
			'width': length-24
		}, 300)
	})
	setInterval(function(){
		$('#nav .left .lmove .i1').animate({"top":"-10px"},function(){
			$(this).animate({'top':'0'},function(){
				$('#nav .left .lmove .i2').animate({"top":"-10px"},function(){
					$('#nav .left .lmove .i2').animate({"top":"0"},function(){
						$('#nav .left .lmove .i3').animate({"top":"-10px"},function(){
							$('#nav .left .lmove .i3').animate({"top":"0"})
						})
					})
				})
			})
		})
	
	},1000)
	
}
/*--------------------list 左边商品列表---------------------*/	
function list(){//商品列表
	var bgArr = [1,2,3,4,5,6,7,8,9]//遍历列表加背景
	$('#nav .list .l1').each(function(){
		var index = $(this).index()
		$(this).find('.acom').css('background','url(../img/listbg'+bgArr[index-1]+'.png) no-repeat 0 center')
	})
	$('#nav .list .l1').hover(function(){
		$(this).stop().animate({'paddingLeft':'26px'})
		$(this).css('background','#a90000')
		$(this).parent().css({'overflow':'visible'})
			$(this).find('.list_child').css({"display":"block"})
		$(this).find('.list_child').animate({"left":"180px","opacity":'0.9'})
	},function(){
		$(this).stop().animate({'paddingLeft':'18px'})
		$(this).css('background','#cb351a')
		$(this).parent().css({'overflow':'hidden'})
		$(this).find('.list_child').css({"display":"none"})
		$(this).find('.list_child').animate({"left":"170px","opacity":'0.5'})
	})
}
function navleftlistswitch(){
	$('#nav .list').css({'height':'36px','overflow':'hidden'});
	$('#nav .list .l_f').css({'background':'#cb351a url(../img/x1.png) no-repeat 146px 16px'});
	$('#nav .list').hover(function(){
			$(this).stop().animate({"height":"516px"})
			$(this).find('.l_f').css({'background':'#cb351a url(../img/x2.png) no-repeat 146px 16px'})
		},function(){
			$(this).stop().animate({"height":"36px"})
			$(this).css({'overflow':'hidden'})
			$(this).find('.l_f').css({'background':'#cb351a url(../img/x1.png) no-repeat 146px 16px'})
	})
}

/*---------------------商品栏请求json数据------------------*/
function listAjax(){
$.ajax({
	url: "../js/nav_list.json",
	success: function(data) {
		var msg = data.data;
		$('#nav .list .l1').each(function() {
			var index = $(this).index();
			var str = ''
			var str1 = '';
			var str2 = '';
			var str3 = '';
			var str4 = '';
			var str5 = '';
			var nstr = '';
			for (var i in msg[index - 1].hot) {
				str1 += '<a href="#">' + msg[index - 1].hot[i] + '</a>'
			}
			for (var i in msg[index - 1].type) {
				str2 += '<a href="#">' + msg[index - 1].type[i] + '</a>'
			}
			for (var i in msg[index - 1].appropriate) {
				str3 += '<a href="#">' + msg[index - 1].appropriate[i] + '</a>'
			}
			for (var i in msg[index - 1].benefit) {
				str4 += '<a href="#">' + msg[index - 1].benefit[i] + '</a>'
			}
			str +=
				'<div class="list_child">' +
				'<div class="box1">' +
				'<h4>麦乐购11周年庆</h4>' +
				'<a href="#">' + msg[index - 1].hallName + '分会场</a>' +
				'</div>' +
				'<div class="box2">' +
				'<h4>' + msg[index - 1].h4_1 + '</h4>' +
				str1 +
				'</div>' +
				'<div class="box3">' +
				'<h4>' + msg[index - 1].h4_2 + '</h4>' +
				str2 +
				'</div>' +
				'<div class="box4">' +
				'<h4>' + msg[index - 1].h4_3 + '</h4>' +
				str3 +
				'</div>' +
				'<div class="box5 box4">' +
				'<h4>' + msg[index - 1].h4_4 + '</h4>' +
				str4 +
				'</div>' +
				'</div>'

			$(this).append(str)
			if (msg[index - 1].h4_5) {
				for (var i in msg[index - 1].aaa) {
					str5 += '<a href="#">' + msg[index - 1].aaa[i] + '</a>'
				}
				nstr =
					'<div class="">' +
					'<h4>' + msg[index - 1].h4_5 + '</h4>' +
					str5 +
					'</div>'
			}
			$(this).find(".list_child").append(nstr)
		})
	}
});
}
/*----------------showhead---------------*/
function showHeadForm() {
	$('#showHead .inp').focus(function() {
		$(this).val('')
	})
	$('#showHead .inp').blur(function() {
		var str = $(this).val() //用户体验好，可保存用户输入的内容
		if (str == '') {
			$(this).val('11周年庆，最高满199减100再返200')
		} else {
			$(this).val(str)
		}
	})
}
function showHead(){
	$(window).scroll(function(){
		var sc = $(this).scrollTop();
		if(sc > 2000){
			$('#showHead').css('display','block');
		}else{
			$('#showHead').css('display','none');
		}
	})
}
/*------------侧边栏划过效果------------*/
function rListhover(){
$('#r_list .r_list li').mouseout(function(){
				$(this).find('p').stop().animate({'left':'0'})
				$(this).find('p').css({'width':'0','overflow':'hidden'})
			})
			$('#r_list .r_list li').eq(0).mouseover(function(){
				$(this).find('p').stop().animate({'left':'-120px','width':'120px'})
			})
			$('#r_list .r_list li').eq(1).mouseover(function(){
				$(this).find('p').stop().animate({'left':'-80px','width':'80px'})
			})
			$('#r_list .r_list li').eq(2).mouseover(function(){
				$(this).find('p').stop().animate({'left':'-80px','width':'80px'})
			})
			$('#r_list .r_list li').eq(3).mouseover(function(){
				$(this).find('p').stop().animate({'left':'-240px','width':'240px'})
			})
			$('#r_list .r_list li').eq(4).mouseover(function(){
				$(this).find('p').stop().animate({'left':'-80px','width':'80px'})
			})
			$('#r_list .r_list li').eq(5).click(function(){
				$('html,body').animate({'scrollTop':0})
			})
}
/*----------------------侧边栏效果----------------*/
function rlist(){//---------------------侧边栏展开关闭和切换
	var num1 = 0
	var num2 = 0;
	$("#r_list .r_list .user").click(function(){//点击用户头像
		num1++				
		if(num1 % 2 == 1){
			num2 = 0;//用户登录状态显示，购物车隐藏
			$(this).parents('#r_list').find('.list_con .userstatus').css('display','block').siblings().css('display','none')
			$(this).parents('#r_list').animate({'right':'0'})					
		var islogin = getCookie('success');
			//alert(islogin)
			if(islogin == 'true'){//根据登录状态判断
				var user = getCookie('user');
				var str = user.substring(0,3)
				var str1 = user.substring(7,11)
				var myStr = str + '****' + str1
				$('.unlogin .p2').html(myStr)
				$(this).parents('#r_list').find('.unlogin').addClass('show').siblings().removeClass('show')//unlogin是欢迎回来					
			}else{//未登录状态												
				$(this).parents('#r_list').find('.login').addClass('show').siblings().removeClass('show');
			}							
		}else{
			$(this).parents('#r_list').animate({'right':'-280px'})	
			$(this).parents('#r_list').find('.list_con .userstatus').css('display','none')//选项卡切换
		}
	})//user
	var cookies = document.cookie;
	var arrCook = cookies.split('; ');
	var arr = []
	for(var i = 0;i < arrCook.length;i++){
		var cook = arrCook[i].split('=');
		if(!isNaN(cook[0])){
			arr.push(cook[1]);
		}
	}
	var count = 0
	for(var j = 0;j < arr.length;j++){
		 count +=  parseInt(getCookie('dataId'+ arr[j]))
	}//获取商品数量	
	$('#r_list').find('.p1 .cart b').html(count)//页面一刷新就有	
	$("#r_list .r_list .cart").click(function(){
		num2++				
		if(num2 % 2 == 1){
			num1 = 0;//购物车显示，用户登录隐藏
			$(this).parents('#r_list').find('.list_con .isbuy').css('display','block').siblings().css('display','none')
			var islogin = getCookie('success')
			if(islogin == 'false' || islogin == ''){//未登录状态下
				$(this).parents('#r_list').find('.list_con .nobuy').css('display','block').siblings().css('display','none')
				$(this).parents('#r_list').find('.p1 .cart b').html(0)//显示没有商品的状态
			}else{//登录状态
				if(count == '' || count == 0){//没买东西的状态
					$(this).parents('#r_list').find('.list_con .nobuy').css('display','block').siblings().css('display','none')
					$(this).parents('#r_list').find('.p1 .cart b').html('0')
				}else{//买东西的状态
					$(this).parents('#r_list').find('.list_con .buy').css('display','block').siblings().css('display','none')
					$(this).parents('#r_list').find('.p1 .cart b').html(count)
				}//买东西的状态
			}//登录状态
			
		
			$(this).parents('#r_list').animate({'right':'0'})					
		}else{
			$(this).parents('#r_list').animate({'right':'-280px'})	
			$(this).parents('#r_list').find('.list_con .isbuy').css('display','none')//选项卡切换
		}
	})//cart
}	
function btnFn(){//------------------侧边栏登录的验证			
$('#r_list .login .btn').click(function(){
	$('#r_list .login .warn').css('display','none')
	var name = $('#r_list .phone').val();		
	var pass = $('#r_list .pass').val();
	if(name == getCookie('user') && pass == getCookie('pass')&& flag4){
		//alert('登录成功')
		$('#r_list .login').removeClass('show').siblings().addClass('show')
		setCookie('success',true);
		$('#r_list .unlogin .p2').html(myStr)
		var user = getCookie('user');
		var str = user.substring(0, 3)
		var str1 = user.substring(7, 11)
		var myStr = str + '****' + str1
	$(this).parents('body').find('#header .head_top .left .s1').html('<a href="#">麦乐购首页</a>' + myStr + '<a class="exit" href="#">退出</a>')
		$(this).parents('body').find('#header .head_top .left .s2').css({
			'display': 'none'
		})
	
		$(this).parents('body').find('#header .head_top .left .s1 .exit').click(function() {
		$(this).parent().next().css({
			'display': 'inline'
		})
		setCookie('success', false)
		$(this).parents('body').find('#r_list').animate({'right':'-280px'})
		
		$(this).parent().html(
			'<a href="#">麦乐购首页</a>' +
			'<a class="login" href="login.html">请登录</a>' +
			'<a class="reg" href="register.html">免费注册</a>')

	})
	
	}else{
		setCookie('success',false)
		//alert(1)
		if(name == ''){
		$('#r_list .login .warn_phone').html("请输入账号").css('display','block')
		}else if(pass == ''){
			$('#r_list .login .warn_pass').html("请输入密码").css('display','block')
		}else if(name != getCookie('user')){
			$('#r_list .login .warn_phone').html('用户不存在').css('display','block')
		}else if(pass != getCookie('pass')){
			$('#r_list .login .warn_yanzheng').html('您输入的用户名或密码错误，请核对后重新输入！').css('display','block')
			}else if(!flag4){
				yanzheng()
			}
		}
	})
}
var flag4 = false	
function yanzheng(){//----------------------登录的验证
	var str = yanzhengma()
	$('#r_list .login .placeyanzhengma').html(str)
	$('#r_list .login .change').click(function(){
	var str = yanzhengma()
	$('.placeyanzhengma').html(str)
	})
	$('.yanzheng').blur(function(){		
		if(s == ''){
			$(this).parents('.warn_parent').find('.warn').css({'display':'block','color':'#ff6b52'}).html('请输入验证码')
			flag4 = false
		}else{
			var s = $(this).val();
			var ss = $('.placeyanzhengma').html()
   	 		if (s == ss){         	 		
				$(this).parents('.warn_parent').find('.warn').css({'display':'none'})
				$('.placeyanzhengma').css({'background':'#ccc url(../img/dui.png) no-repeat 0 center'})
				flag4 = true
        	}else{        					$(this).parents('.warn_parent').find('.warn').css({'display':'block','color':'#ff6b52'}).html('验证码有误，请重新输入，请重新输入')
        					$('.placeyanzhengma').css({'background':'#ccc url(../img/cuo.png) no-repeat 0 center'})
        		flag4 = false
        	}
		}
	})	
}