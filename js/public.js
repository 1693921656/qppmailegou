/*-----------------------任何地方的倒计时都可以调用-----------------*/
function daojishi(myday){
	var now = new Date();
	var time = myday - now;
	var ms = Math.floor((time) / 1000);
	var d = Math.floor(ms / 60 / 60 / 24 );
	var h = Math.floor(ms % 86400 / 3600);
	var m = Math.floor(ms % 86400 % 3600 / 60);
	var s = ms % 60;	
	var arr = [
		h < 10 ? 0 : Math.floor(h / 10), h % 10,
		m < 10 ? 0 : Math.floor(m / 10), m % 10,
		s < 10 ? 0 : Math.floor(s / 10), s % 10,d
	];
	return arr;
}
/**
*startime 应该是毫秒数
*
*/
/*----------------倒计时函数------------------*/
var Alarm = function (startime, endtime, countFunc, endFunc) {
        this.time = Math.floor((endtime - startime) / 1000); //时间
        this.countFunc = countFunc; //计时函数
        this.endFunc = endFunc; //结束函数
        this.flag = 't' + Date.parse(new Date()); //
    };
Alarm.prototype.start = function () {
    var self = this;

    self.flag = setInterval(function () {
        if (self.time < 0) {
            clearInterval(self.flag);
            self.endFunc();
            console.log('计时结束');
        } else {

            var minute, hour, day, second;
            day = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
            hour = Math.floor(self.time / 60 / 60 % 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 % 24) : Math.floor(self.time / 60 / 60 % 24);
            minute = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
            second = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
            //倒计时执行函数
            self.countFunc(second, minute, hour, day);
            self.time--;

        }
    }, 1000);
}
/*---------------分页函数-----------------------*/
function fenye(myindex,objnext,objprev,obj1,mywidth,changeObj){//myindex为总页数obj(objnext,objprev)为点击事件的对象,obj1是要改变left值的元素对象,mywidth是对象的宽,changeObj是页数需要随着变化的元素对象
var index = 1;//初始化一个变量，当前页数
objnext.click(function(){//向右的点击按钮
	index++;
	if(index > myindex){//大于总页数，重新开始
		index = 1;
	}
	
	var myleft = parseInt(obj1.css('left'))//获取当前对象的left值
	if(myleft == -mywidth*(myindex-1)){//边界
		myleft = mywidth
	}
	obj1.css('left',myleft-mywidth+'px')//改变对象left值	
	changeObj.html(index)//将当前页数写在页面对应元素中
})
objprev.click(function(){
	index--;//页数减
	if(index < 1){//边界
		index = myindex;
	}
	var myleft = parseInt(obj1.css('left'))//当前left值
	if(myleft == 0){//边界
		myleft = -mywidth*myindex
	}
	obj1.css('left',myleft+mywidth+'px')	
	changeObj.html(index)
})
}
/*----------------轮播图的封装----------------*/
function lunbochange(prev,next,obj,interval,time,myleft,objpar,index,objChild){//prev向左的按钮，next向右的按钮，interval定时器的时间,obj要改变left值的对象，time运动时间，myleft是运动的目标值objpar是移入的盒子index是obj子元素的个数减1，objChild是子元素
	var timer = null
	 timer = setInterval(function(){
		next.click()
	},interval)
	next.click(function(){
		obj.stop().animate({'left':-myleft+"px"},time,function(){
			obj.css('left','0')
			obj.find(objChild).eq(0).appendTo(obj)
		})
	})
	prev.click(function(){
		obj.stop().animate({'left':0+"px"},time,function(){
			obj.css('left','-myleft')
			obj.find(objChild).eq(index).prependTo(obj)
		})
	})
	objpar.hover(function(){
		clearInterval(timer)
	},function(){
		timer = setInterval(function(){
		next.click()
	},interval)
})
}






























