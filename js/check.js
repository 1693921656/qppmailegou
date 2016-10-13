/*---------------验证码（类名必须一致）-------------*/
	function yanzhengma(){
		var myArr = [];
			var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			for(var i = 0; i < 4;i++){
				var num = Math.floor(Math.random()*36);
				myArr.push(arr[num]);
			}
			     var str = myArr.join('');
			     return str;
	}
