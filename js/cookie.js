//添加cookie的函数
function setCookie(key,value,expires,path,domain,secure){
	var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	if(expires instanceof Date){
		cookie += ";expires=" + expires;
	}
	if(path){
		cookie += ";path=" + path;
	}
	if(domain){
		cookie += "domain=" + domain;
	}
	if(secure){
		cookie += ";secure";
	}
	document.cookie = cookie;
}
 //cookie失效日期，时间对象的函数
 function setCookieDate(day){
	var date = null;
	if(typeof day == 'number' && day > 0){
		date = new Date();
		date.setDate(date.getDate() + day);
	}
	return date;
 }

//alert(document.cookie);
//qpp=qpp; url=baidu.com; Email=qpp.com    添加的cookie
//alert(getCookie("qpp"));
//根据键查找到值，比如根据参数key是url，得到的值是baidu.com
function getCookie(key){
	var cookieName = encodeURIComponent(key) + "=";
	var cookieValue = "";
	var cookieStart = document.cookie.indexOf(cookieName);
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		if(cookieEnd == -1){
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}
//删除cookie
function removeCookie(key){
	document.cookie = key + "=;expires=" + new Date(0);
}